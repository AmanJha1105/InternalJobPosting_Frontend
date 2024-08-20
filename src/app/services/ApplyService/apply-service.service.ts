import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApplyServiceService {

  private apiUrl = 'http://localhost:8083/api/employees';

  constructor(private http: HttpClient) { }

  apply(employeeId: number, openingId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${employeeId}/apply/${openingId}`,{});
  }
}
