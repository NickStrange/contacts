import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  contact: Contact;
  id : number;

  constructor(public dataService: ContactService, private router:Router, 
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log('PASSED' + this.id);
    this.contact = this.dataService.getContact(this.id);
   // this.contact =  new Contact(null, "", "", "", "", "", "", "", "", "", "", "");
  }

  createContact(){
    this.dataService.createContact(this.contact);
    this.contact = new Contact(null, "", "", "", "", "", "", "", "", "", "", "")
    this.router.navigateByUrl('/contact-list');
  }
}
