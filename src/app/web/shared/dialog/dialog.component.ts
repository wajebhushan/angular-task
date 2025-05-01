import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent  {
  isVisible = input<boolean>(false);
 dialogType = input<'add' | 'edit' | 'delete'>('add'); 
  user = input<any>(null);
  closeDialog = output<void>();
  save = output<any>();
  delete = output<any>();

  onClose() {
    this.closeDialog.emit();
  }

  onSave() {
    this.save.emit(this.user());
  }

  onDelete() {
    if (this.user()) {
      this.delete.emit(this.user());
    }
  }
}
