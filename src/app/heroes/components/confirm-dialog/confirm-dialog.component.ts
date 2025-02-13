import { Component, Inject, Input } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Hero,
  ){}

  public onNoClick() : void{
    this.dialogRef.close(false);
  }
  public onConfirm(): void{
    this.dialogRef.close(true);
  }
}
