import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { GridStore } from '../shared/data-access/grid-data.store';
import { DialogComponent } from '../shared/dialog/dialog.component';


@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [AgCharts,CommonModule,DialogComponent],
  providers: [GridStore],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {
  chartOptions: any;
  dynamicTeamMembers = signal<any>([ {
    id:1,
    name: 'Ethan Parker',
    username: 'ethan',
    avatar: 'assets/avatar-2.png',
    status: 'Admin',
    role: 'Backend Developer',
    progress: 85,
    teams: ['Engineering', 'DevOps'],
    selected: false,
  },
  {

    id:2,
    name: 'Ava Smith',
    username: 'ava',
    avatar: 'assets/avatar-2.png',
    status: 'Customer',
    role: 'QA Engineer',
    progress: 60,
    teams: ['QA', 'Support'],
    selected: false,
  }])
  isDialogVisible = false;
  currentUser = signal( null);  // For editing an existing user
  dialogType: 'add' | 'edit' | 'delete' = 'add'; // Current dialog type
  toggleAll = signal(false);
  currentPage = 1;
  totalPages = 10;
  visiblePages: (number | string)[] = [1,2,3,4,5];
   allSelected = computed(() => this.gridStore.rows().every((user: any) => user.isSelected));
   someSelected = computed(() => this.gridStore.rows().some((user: any) => user.isSelected));

  gridStore = inject(GridStore)
  constructor(){
    this.chartOptions = {
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Feb', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'Mar', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Apr', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'May', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'jun', avgTemp: 11, iceCreamSales: 300000 },
        { month: 'jul', avgTemp: 12, iceCreamSales: 400000 },
        { month: 'Aug', avgTemp: 13, iceCreamSales: 500000 },
        { month: 'Sep', avgTemp: 14, iceCreamSales: 600000 },
        { month: 'Oct', avgTemp: 15, iceCreamSales: 700000 },
        { month: 'Nov', avgTemp: 16, iceCreamSales: 800000 },
        { month: 'Dec', avgTemp: 17, iceCreamSales: 900000 },
      ],
      series: [
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'iceCreamSales',
          fill: '#7e3af2', 
          stroke: '#5b21b6', 
        }
      ]
    };
    this.gridStore.loadGridData();
    if(this.gridStore.rows())
{

}  
  }
  onToggleAllChange(event:any) {
   this.gridStore.toggleAll({isSelected:event.target.checked})
  }
  
  onUserToggle(userId: any, event: any) {
    this.gridStore.toggleRow({ id: userId, isSelected: event.target.checked })

    this.dynamicTeamMembers.update((users:any) =>
      users.map((user:any) =>
        user.id === userId ? { ...user, selected: event.target.checked } : user
      )
    );
  }

  getUserShortName(firstName: any,lastName:any ) {
    return `${firstName.substring(0, 1)}${lastName.substring(0, 1)}`.toUpperCase();
  }

  openDialog(type: 'add' | 'edit' | 'delete', user?: any) {
    this.dialogType = type;
    this.currentUser.set(user)
    this.isDialogVisible = true;
  }

  closeDialog() {
    this.isDialogVisible = false;
  }

  saveUser(user: any) {
    this.closeDialog();
  }

  deleteUser(id: any) {
    this.gridStore.deleteRow({ id });
    this.closeDialog();
  }
  
}
