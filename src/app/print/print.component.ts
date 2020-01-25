import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  constructor(public authService: AuthService, 
    private router:Router,
    private ngZone: NgZone){}

  ngOnInit() {
  }

  logOut() {
    this.authService.logOut();
    this.ngZone.run(() => this.router.navigateByUrl('/home'));
  }

}
