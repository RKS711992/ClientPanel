import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"; 

import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;


  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', refe => refe.orderBy('lastName', 'asc'));    
  }

  getClients(): Observable<Client[]> {
    //Get the clients with ID
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return {id,...data};//Important to fetch ID
      }))
    );
    console.log(this.clients);
    return this.clients;
  }

  getClient(id: string): Observable<Client> {
    //Get the clients with ID
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(map(action=>{
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as Client
        data.id = action.payload.id;
        return {id,...data};//Important to fetch ID
      }
    }));
    return this.client;
  }

  newClient(client:Client){
    this.clientsCollection.add(client);
  }

  updateClient(client: Client){
    this.clientDoc =  this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client); 
  }

  deleteClient(client: Client){
    this.clientDoc =  this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
