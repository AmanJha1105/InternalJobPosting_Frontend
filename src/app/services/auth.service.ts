import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8090/api/employees';
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log(`${this.apiUrl}/login`);
    console.log(username,password);
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password});
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  saveEmployeeInfo(employeeInfo: any): void {
    localStorage.setItem('employeeInfo', JSON.stringify(employeeInfo));
  }

  getEmployeeInfo(): any {
    console.log("22");
    
    return JSON.parse(localStorage.getItem('employeeInfo') || '{}');
  }

  clearEmployeeInfo(): void {
    localStorage.removeItem('employeeInfo');
  }
}
