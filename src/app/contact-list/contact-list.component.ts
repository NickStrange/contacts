import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { Observable } from 'rxjs';
import { faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PrintLabelComponent } from '../print-label-component';


pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  faPencil = faPencilAlt;
  faTrash = faTrash;

  contacts$: Observable<Contact[]>;
  selectedContact: Contact;

  constructor(private contactService: ContactService, private router:Router) { }

  ngOnInit() {
    this.contacts$ = this.contactService.loadContacts();   
  }

  public selectContact(contact: Contact){
    console.log(contact);
    console.log(contact.id);
    this.router.navigateByUrl(`contact-create/${contact.id}`);
    this.selectedContact = contact;
  }

  public deleteContact(contact: Contact){
    this.contactService.deleteContact(contact.id);
  }


  generatePdf() {
    let printLabel = new PrintLabelComponent(this.contactService.labelgenerator());
    printLabel.generatePdf();
  }
}

