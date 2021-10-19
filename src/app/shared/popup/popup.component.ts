import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  principal = '';
  secundaria = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data ,
    public dialogRef: MatDialogRef<PopupComponent>
    ) { }

  ngOnInit(): void { }

}
