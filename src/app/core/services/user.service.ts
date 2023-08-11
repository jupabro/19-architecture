import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.class';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('../../../assets/json/users.json')
  }

  getUser(userId: number): Observable<User> {
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
