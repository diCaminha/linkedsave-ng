import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dayread } from '../models/dayread';

@Injectable({
  providedIn: 'root',
})
export class DayreadsService {
  constructor(private http: HttpClient, private router: Router) {}

  getDayReads(): Observable<{ message: string; data: Dayread[] }> {
    return this.http.get<{ message: string; data: Dayread[] }>(
      environment.API_URL + 'dayreads'
    );
  }
}
