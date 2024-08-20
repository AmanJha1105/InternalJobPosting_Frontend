import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8083/api/employee';
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log(`${this.apiUrl}/login`);
    console.log(username,password);
    
    
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password});
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  // setEmployeeDetails(details: any): void {
  //   this.employeeDetails = details;
  // }

  // getEmployeeDetails(): any {
  //   return this.employeeDetails;
  // }

  // isLoggedIn(): boolean {
  //   return this.employeeDetails !== null;
  // }

  // logout(): void {
  //   this.employeeDetails = null;
  // }
}
