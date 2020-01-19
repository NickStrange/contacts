import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  isAdmin$: Observable<boolean>;
  userId$: Observable<string>;


  constructor(public afAuth: AuthService, 
              private router:Router,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.isLoggedIn$ = this.afAuth.isLoggedIn$
    this.isLoggedOut$ = this.afAuth.isLoggedOut$
    this.userId$ = this.afAuth.userId$;
    this.isAdmin$ = this.afAuth.isAdmin$;
   }

  logOut() {
      this.afAuth.logOut();
    }

  logIn(){
    this.afAuth.logIn();  
  }

  onLoginSuccessful(result){
    console.log(result);
    // this.ngZone.run(() => this.router.navigateByUrl('/contacts'));

  }
}
