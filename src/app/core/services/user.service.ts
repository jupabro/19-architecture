import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.class';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private user = new BehaviorSubject<User | null>(null)
  user$ = this.user.asObservable()

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('../../../assets/json/users.json')
  }

  login(userId: number): Observable<boolean> {
    return this.getUserById(userId).pipe(
      map((user) => {
        this.user.next(user);
        return true;
      }),
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return of(false);
      })
    );
  }

  private getUserById(userId: number): Observable<User> {
    return this.http.get<User[]>('../../../assets/json/users.json').pipe(
      map((users: User[]) => {
        const user = users.find((u) => u.id === userId);
        if (user) {
          return user;
        } else {
          throw new Error(`User with id ${userId} not found`);
        }
      })
    );
  }
}
