import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

    constructor(private _snackBar: MatSnackBar){}

  openSnackBarSuccess(message, action?) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;

    this._snackBar.open(message, action, config);
  }

  openSnackBarError(message, action?) {
    let config = new MatSnackBarConfig();
    config.panelClass = ['ls-snackbar-error'];
    config.duration = 3000;

    this._snackBar.open(message, action, config);
  }
}
