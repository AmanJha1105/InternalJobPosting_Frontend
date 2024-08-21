import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  private apiUrl = 'http://localhost:8090/api/applications';

  constructor(private http: HttpClient) { }

  getApplicationByOpeningID(openingId: number):Observable<any>{
    // http://localhost:8084/api/applications/opening/1?role=hr
    return this.http.get(`${this.apiUrl}/opening/${openingId}?role=hr`);
  }
}
