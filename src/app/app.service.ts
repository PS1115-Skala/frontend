import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Rooms } from 'app/interfaces/rooms';
import { Items } from 'app/interfaces/items';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User } from './interfaces/user';
import { Request, PutRequest } from './interfaces/request';
import { Trimester } from './interfaces/trimester';
import { RoomRequest } from './interfaces/room_request';
import { Hourtable } from './interfaces/hourtable';

const API = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _user: User;

  constructor(private http: HttpClient) { }

  set user(id: User) {
    this._user = id;
  }

  get user(): User {
    return this._user;
  }

  async login(username: string): Promise<User[]> {
    const userData = this.http.get<User[]>(API + 'usuario/' + username).toPromise();
    await userData.then((data: User[]) => {
      if (data.length === 1) {
        this.user = data[0];
        localStorage.setItem('userId', this.user.id);
        localStorage.setItem('userName', this.user.name);
      }
    });
    return userData;
  }

  async isUserType(usertype: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      if (!this.user) {
        const userId = localStorage.getItem('userId');
        if (userId) {
          await this.login(userId).catch(() => reject());
          if (!this.user) {
            reject();
          } else {
            resolve(this.user && this.user.type === usertype);
          }
        } else {
          reject();
        }
      } else {
        resolve(this.user && this.user.type === usertype);
      }
    });
  }

  getRooms(url: string): Observable<Rooms[]> {
    return this.http.get<Rooms[]>(API + url);
  }

  getRoomRequests(url: string): Observable<RoomRequest[]> {
    return this.http.get<RoomRequest[]>(API + url);
  }

  getItems(url: string): Observable<Items[]> {
    return this.http.get<Items[]>(API + url);
  }

  getNotItems(url: string): Observable<Items[]> {
    return this.http.get<Items[]>(API + 'not/items/' + url);
  }

  getRequests(url: String): Observable<Request[]> {
    return this.http.get<Request[]>(API + url);
  }

  getUsers(users?: string): Observable<User[]> {
    if (users) {
      return this.http.get<User[]>(API + 'usuarios/' + users);
    }
    return this.http.get<User[]>(API + 'usuarios/');
  }

  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(API + 'subjects/');
  }

  getReservations(idSala: string, semanas: string): Observable<any[]> {
    return this.http.get<any[]>(API + 'reservas/' + idSala + '/semana/' + semanas)
  }

  getAdminLabs(): Observable<any[]> {
    return this.http.get<any[]>(API + '/usuarios/admin');
  }

  getTrimester(): Observable<Trimester[]> {
    return this.http.get<Trimester[]>(API + 'trimestre/ultimo');
  }

  postRoomRequest(room_id: string): Observable<any> {
    const endpoint = API + 'sala/solicitudes/crear/' + this._user.id;
    return this.http.post(endpoint, { room_id });
  }

  putRoomRequests(roomRequestId: string, status: string): Observable<any> {
    const endpoint = API + 'sala/solicitudes/' + roomRequestId;
    return this.http.put(endpoint, { status: status });
  }

  putTrimester(trimesterId: string, trimesterData: object): Observable<any> {
    return this.http.put(API + 'trimestre/' + trimesterId, trimesterData);
  }

  private handleError(error: HttpErrorResponse) {
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

  updateRoom(sala: string, changes: any): Observable<any>{
    return this.http.put<any>(API + "salas/" + sala, changes)
      .pipe(
        catchError(this.handleError)
      );
  }
 
  getSchedule(sala: string, option: string, semana: string): Observable<Hourtable[]> {
    if (option === "1"){
      return this.http.get<Hourtable[]>(API + '/reservas/' + sala + '/semana/' + semana);
    }
    else  if (option === "2"){
      return this.http.get<Hourtable[]>(API + '/reservas/' + sala + '/semana/impares');
    }
    else if (option === "3"){
      return this.http.get<Hourtable[]>(API + '/reservas/' + sala + '/semana/pares');
    }
    else{
      return this.http.get<Hourtable[]>(API + '/reservas/' + sala + '/semana/todas');
    }
  }

  getViewSchedule(request: string): Observable<any> {
    const endpoint = API + 'solicitudes/' + request + '/horario';
    return this.http.get<any>(endpoint);
  }

  putRequest(requestId: string, putRequest: PutRequest): Observable<any> {
    return this.http.put(API + 'solicitudes/reserva/' + requestId, putRequest, {
      responseType: 'json'
    });
  }

  postImagenSala(room_id: string, pictureBase64: string): Observable<any> {
    const endpoint = API + 'salas/' + room_id + '/picture/new';
    return this.http.post(endpoint, {picture: pictureBase64}).pipe(
      catchError(this.handleError)
    );
  }

  putItemQuantity(room_id: string, item_id: string, putItem: number){
    const endpoint = API + 'salas/' + room_id + '/' + item_id;
    return this.http.put(endpoint, {quantity: putItem}).pipe(
      catchError(this.handleError)
    );
  }

  putRemoveItem(room_id: string, item_id: string):Observable<any>{
    const endpoint = API + 'salas/' + room_id + '/' + item_id;
    return this.http.delete(endpoint).pipe(
      catchError(this.handleError)
    );
  }

  postAddItem(room_id: string, item_id: string, postQuantity: number): Observable<any> {
    const endpoint = API + 'salas/' + room_id + '/' + item_id;
    return this.http.post(endpoint, {quantity: postQuantity}).pipe(
      catchError(this.handleError)
    );
  }
}