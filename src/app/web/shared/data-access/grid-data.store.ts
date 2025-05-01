import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';

import { GridApiService } from '../data.service';
import { GridColumn, GridRow } from '../model';

type GridState = {
  columns: GridColumn[] | null;
  rows:any;
  isLoading: boolean;
};

const initialState: GridState = {
  columns: null,
  rows: null,
  isLoading: false,
};

export const GridStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, api = inject(GridApiService)) => ({

    // GET grid data
    loadGridData: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          api.getGridData().pipe(
            tap({
              next: (data) => {
                patchState(store, {
                  columns: data.grid_columns,
                  rows: data.grid_data.map(row => ({
                    ...row,
                    isSelected: false,
                  })),
                  isLoading: false,
                });
              },
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              return of(null);
            })
          )
        )
      )
    ),

    addRow: rxMethod<{ row: GridRow }>(
      pipe(
        tap(() => patchState(store)),
        switchMap(({ row }) => {
          const rows = store.rows() ?? [];
          patchState(store, { rows: [...rows, row] });
          return of(row);
        })
      )
    ),

    updateRow: rxMethod<{ row: GridRow }>(
      pipe(
        tap(() => patchState(store)),
        switchMap(({ row }) => {
          const updated = store.rows()?.map((r:any) =>
            r.id === row.id ? { ...r, ...row } : r
          ) ?? [];
          patchState(store, { rows: updated });
          return of(row);
        })
      )
    ),

    deleteRow: rxMethod<{ id: string }>(
      pipe(
        tap(() => patchState(store)),
        switchMap(({ id }) => {
          const updated = store.rows()?.filter((r:any) => r.id !== id) ?? [];
          patchState(store, { rows: updated });
          return of(id);
        })
      )
    ),

    toggleRow: rxMethod<{ id: string; isSelected: boolean }>(
      pipe(
        switchMap(({ id, isSelected }) => {
          const updated = store.rows()?.map((r:any) =>
            r.id === id ? { ...r, isSelected } : r
          ) ?? [];
          patchState(store, { rows: updated });
          return of(id);
        })
      )
    ),

    toggleAll: rxMethod<{ isSelected: boolean }>(
      pipe(
        switchMap(({ isSelected }) => {
          const updated = store.rows()?.map((r:any) => ({ ...r, isSelected })) ?? [];
          patchState(store, { rows: updated });
          return of(true);
        })
      )
    ),

    resetGrid() {
      patchState(store, initialState);
    },
  }))
);
