import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private  API_ENDPOINT = '';
  public username: String;

  constructor(private http: HttpClient) {
  }

  logout() : Observable<any> {
    localStorage.removeItem('currentUser');
    return this.http
      .get(this.API_ENDPOINT + 'api/users/logout')
      .pipe(
        catchError(ApiService.handleError)
      );
  }

  login(login: string, password: string) : Observable<any> {
    return this.http
      .post(this.API_ENDPOINT + 'api/users/login', {login, password})
      .pipe(
        catchError(ApiService.handleError)
      )
      .pipe(
        tap(
          event => {
            if (event['success']) {
              localStorage.setItem('currentUser', event['username']);
            }
          }
        )
      );
  }

  register(login: string, password: string): any {
    return this.http
      .post(this.API_ENDPOINT + 'api/users/register', {login, password})
      .pipe(
        catchError(ApiService.handleError)
      );
  }

  getLogin() : string {
    return localStorage.getItem('currentUser');
  }

  private static handleError(error: HttpErrorResponse) {
    alert('Произошла ошибка.');


    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getHits() : Observable<any> {
    return this.http
      .get(this.API_ENDPOINT + 'api/users/dots')
      .pipe(
        catchError(ApiService.handleError)
      );
  }

  hit(x: number, y: number, r: number) {
    return this.http
      .post(this.API_ENDPOINT + 'api/users/dots', {
        x, y, r
      })
      .pipe(
        catchError(ApiService.handleError)
      );
  }
}
