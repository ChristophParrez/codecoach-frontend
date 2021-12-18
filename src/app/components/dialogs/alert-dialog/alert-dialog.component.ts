import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

  onOkay(): void {
    this.dialogRef.close(true);
  }
}

export interface AlertDialogData {
  title: string;
  message: string;
}
