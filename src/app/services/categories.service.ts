import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore) { }

  loadData(){

    return this.afs.collection('categories').snapshotChanges().pipe(map(actions =>{
     return actions.map(a =>{
       const data = a.payload.doc.data();
       const id = a.payload.doc.id;
       return {id, data}
     })
   }))
 }
}
