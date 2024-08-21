import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8090/api';
  constructor(private http: HttpClient) {}

  getAppliedEmployees(openingId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/applications/opening/${openingId}?role=hr`);
  }
}
