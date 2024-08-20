import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8083/api/employee';
  private empId:number| null=null;
  
  constructor(private http: HttpClient) {}

  getEmpId(): number | null {
    if (this.empId === null) {
      const storedEmpId = localStorage.getItem('empId');
      this.empId = storedEmpId ? parseInt(storedEmpId, 10) : null;
    }
    return this.empId;
  }

  private setEmpId(empId: number): void {
    this.empId = empId;
    localStorage.setItem('empId', empId.toString());  
  }


  login(username: string, password: string, isAdmin: boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password, isAdmin })
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data)
  }
}
