import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import * as firebase from 'firebase/compat/app'

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
  return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', categoryId)).snapshotChanges().pipe(
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

 loadSimilarPost(catId : any){
  return this.afs.collection('posts', ref => ref.where('category.categoryId', '==', catId).limit(3)).snapshotChanges().pipe(
    map(actions =>{
   return actions.map(a =>{
     const data = a.payload.doc.data();
     const id = a.payload.doc.id;
     return {id, data}
   })
 }))

 

 }

 countViews(postId : any){

  const viewsCount = {
    views: firebase.default.firestore.FieldValue.increment(1)
  }
  this.afs.doc(`posts/${postId}`).update(viewsCount).then(() =>{
    
    
  })
}



}
