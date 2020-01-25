import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ui: firebaseui.auth.AuthUI;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  userId$: Observable<string>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore,
    private router:Router, private ngZone: NgZone) { }

  logIn(){
    const uiConfig = {
      signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {

          signInSuccessWithAuthResult: this
              .onLoginSuccessful
              .bind(this)
      }

  };

    this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
    this.ui.start('#firfebaseui-auth-container', uiConfig);
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    this.userId$ = this.afAuth.authState.pipe(map(user => user? user.uid: null));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));


  this.isAdmin$ = new Observable((observer: Subscriber <boolean>) => {
    this.userId$.subscribe(userid => {
      let isAdmin = this.db.doc(`users/${userid}`)
         .snapshotChanges().subscribe(snap => {
            let user = snap.payload.data() as User;
            observer.next(user? !!user.isAdmin: null)
           },
           err => console.log('Error in ', err))
      })
      });
   }


  ngOnDestroy(){
    this.ui.delete();
  }

  onLoginSuccessful(result){
    console.log(result);
    this.ngZone.run(() => this.router.navigateByUrl('/contact-list'));
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.ui.delete();
  }
}