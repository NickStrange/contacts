import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../model/contact';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'; 
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  contact: Contact;
  id : number;
  isInsert: boolean;

  constructor(public dataService: ContactService, private router:Router, 
    private route:ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isInsert = this.id == undefined;
    console.log('PASSED insert', this.isInsert);
    if (this.isInsert) {
      this.contact = new Contact(3, "", "", "", "", "", "", "", "", "", "", "");
      console.log('create new empty contact ', this.contact);
    }
    else {
      this.contact = this.dataService.getContact(this.id);
      console.log('in update', this.contact);
    }
  }

  openDialog(msg: String)  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { description:"Error:", name: msg, label1:"close"};
    let dialogRef= this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe (result => console.log(`dialog result: ${result}`))
  }

  createContact(){
    if (this.isInsert){
      this.dataService.createContact(this.contact)
          .subscribe(val => console.log('create contact', val), 
              err => this.openDialog(err))}
    else {
      this.dataService.updateContact(this.contact)
          .subscribe(val => console.log('update contact', val), 
              err => this.openDialog(err))}
    this.router.navigateByUrl('/contact-list');
  }
}
