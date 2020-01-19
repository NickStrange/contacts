import { Injectable, OnInit } from '@angular/core';
import { Contact } from '../model/contact';
import { Observable, Subscriber, from, onErrorResumeNext } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ContactService{

  contacts: Contact[] = [
   // new Contact(1, "Mr", "Nick", "Strange", "617 392 0970", "nsstrange@icloud.com", "Fidelity", "348 Nahant Rd", "Mahant", "US","Ma", "01907"),
   // new Contact(1, "Ms", "Wendy", "Payne", "617 392 0970", "nsstrange@icloud.com", "Fidelity", "348 Nahant Rd", "Mahant", "US","Ma", "01907")
  ];

  contacts$: Observable<Contact[]>;
  observer;


  
  constructor(private db: AngularFirestore) { }


  doContacts(){
    this.contacts$ = new Observable((observer) => 
        this.loadContacts().subscribe(val => {this.contacts = val; observer.next(this.contacts)})
    )
  }


  loadContacts(): Observable <Contact[]>{
    return this.db.collection('contacts').snapshotChanges()  
        .pipe(map(snaps => {
            return snaps.map(snap=>{
              console.log('load contentes', snap);
              let contact = snap.payload.doc.data() as Contact
              return <Contact> {
                  id: snap.payload.doc.id,
                  ...contact
        };
      });
     }
    ));
  }
  
  
  public createContact(contact: Contact) : Observable <any>{
    console.log('creating ', contact.id)
    this.contacts.push(contact);
    return from(this.db.doc(`contacts/${contact.id}`).set({
      ...contact
    }));
  }
  
  public updateContact(contact: Contact) : Observable <any>{
    console.log('updating ', contact.id)
    return from(this.db.doc(`contacts/${contact.id}`).update({
      ...contact
    }));
  }

  public deleteContact(id: Number): Observable <any>{ 
    const contact = this.contacts.filter(contact => contact.id == id)[0]
    console.log('DELETE ', id);
    return from(this.db.doc(`contacts/${id}`).delete());
  }

  public getContact(id: number) :Contact{
      const contact = this.contacts.filter(contact => contact.id == id)[0]
      console.log('found ' , contact , ' for ', id);
      return contact;
    }

  *labelgenerator(){
    for (let contact of this.contacts) {
      let res = []
      res.push(contact.title + ' ' + contact.first_name + ' ' + contact.last_name);
      res.push(contact.address);
      res.push(contact.city);
      res.push(contact.state+ ' ' + contact.post_code);
      res.push(contact.country)
      yield(res);
    }
  }
}
