import { Component } from '@angular/core';
import { faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons'
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Foundation Contacts';
  faPencil = faPencilAlt;
  faTrash = faTrash;

  constructor(private afAuth: AuthService){

  }

  ngOnInit(){
  }
}
