import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api/datos-estructuras';

  constructor(private http: HttpClient) {}

  uploadCsv(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('archivo', file);
    return this.http.post<string>(`${this.apiUrl}/subir-csv`, formData, { responseType: 'text' as 'json' });
  }
}