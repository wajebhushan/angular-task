import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridColumn, GridRow } from './model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GridApiService {
  private readonly API = 'https://01.fy25ey01.64mb.io/';

  constructor(private http: HttpClient) {}

  getGridData(): Observable<{ grid_columns: GridColumn[]; grid_data: GridRow[] }> {
    return this.http.get<{ grid_columns: GridColumn[]; grid_data: GridRow[] }>(this.API);
  }
}
