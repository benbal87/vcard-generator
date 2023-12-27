import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs'

const fileUrls = {
  a2z: 'assets/data/contact_data_a2z_company.json'
}

@Injectable({
  providedIn: 'root'
})
export class JsonContactReaderService {
  constructor(private http: HttpClient) { }

  readContact(fileUrl: string): Observable<any> {
    return this.http.get<any>(fileUrl)
      .pipe(
        // map(r => r.data),
        catchError(e => throwError(() => e)),
        tap(r => {
          console.log('tap', r)
        })
      )
  }
}
