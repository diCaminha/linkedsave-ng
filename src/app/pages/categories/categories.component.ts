import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ls-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  isAuth: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
