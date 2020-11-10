import { AppUser } from '../models/app-user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { switchMap, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  save(user: firebase.User) {
    const userRef = this.db.collection('users').doc(user.uid);

    userRef.get()
      .subscribe(x => {
        if (!x.exists) {
          userRef.set({
            name: user.displayName,
            email: user.email
          });
        } else {
          userRef.update({
            name: user.displayName,
            email: user.email
          });
        }
      });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.collection('users').doc(uid).get().pipe(
      map(user => user.data() as AppUser)
    );
  }

}
