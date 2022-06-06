import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs : AngularFirestore) { }

  loadFeatured(){

    return this.afs.collection('posts', ref => ref.where('isFeatured', '==', true).limit(4)).snapshotChanges().pipe(
      map(actions =>{
     return actions.map(a =>{
       const data = a.payload.doc.data();
       const id = a.payload.doc.id;
       return {id, data}
     })
   }))
 }


 loadLatest(){

  return this.afs.collection('posts', ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
    map(actions =>{
   return actions.map(a =>{
     const data = a.payload.doc.data();
     const id = a.payload.doc.id;
     return {id, data}
   })
 }))

 }

 loadCategoryPost(categoryId: any){
  return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId).limit(4)).snapshotChanges().pipe(
    map(actions =>{
   return actions.map(a =>{
     const data = a.payload.doc.data();
     const id = a.payload.doc.id;
     return {id, data}
   })
 }))
 }

 loadOnePost(postId: any){
   return this.afs.doc(`posts/${postId}`).valueChanges();
 }

 loadSimilarPost(){

 }



}
