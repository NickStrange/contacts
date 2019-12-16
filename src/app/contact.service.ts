import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [
    new Contact(1, "Mr", "Nick", "Strange", "617 392 0970", "nsstrange@icloud.com", "Fidelity", "348 Nahant Rd", "Mahant", "US","Ma", "01907"),
    new Contact(2, "Ms", "Wendy", "Payne", "617 392 0970", "nsstrange@icloud.com", "Fidelity", "348 Nahant Rd", "Mahant", "US","Ma", "01907")];

  contactObservable: Observable<Contact[]>;
  observer: Subscriber<Contact[]>;
  
  constructor() { 
}
  
  loadContacts(): Observable <Contact[]> {
      this.contactObservable = new Observable<Contact[]>(observer => {
          setTimeout(() => {
              this.observer = observer;
              this.observer.next(this.contacts);
              }, 1000);
          });
  return this.contactObservable;
  }
  
  public createContact(contact: Contact){
    this.contacts.push(contact);
  }

  public deleteContact(id: Number){
console.log('DELETE ', id);
  }

  public getContact(id: number) :Contact{
      return this.contacts[id];
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
