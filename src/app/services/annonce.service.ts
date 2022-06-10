import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  constructor(
    private storage: AngularFireStorage,
    private afs : AngularFirestore,
    private toastr : ToastrService,
    private router : Router
  ) { }

  uploadImage(selectedImage: any, annonceData: any, formStatus: any, id:any){
    const filePath = `annonceImg/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath, selectedImage).then(()=>{
      console.log('annonce image uploaded seccesfully');
      
      this.storage.ref(filePath).getDownloadURL().subscribe(URL =>{
        annonceData.annonceImgPath = URL;
        console.log(annonceData);

        if (formStatus == 'Edit') {
          this.updateData(id, annonceData)
        } else {
          this.saveData(annonceData);
        }
      })
    })   
  }

  saveData(annonceData:any){
    this.afs.collection('annonces').add(annonceData).then(docRef =>{
      this.toastr.success('Data insert successfully');
      this.router.navigate(['/annonces'])
    })  
  }

  loadData(){

    return this.afs.collection('annonces').snapshotChanges().pipe(
      map(actions =>{
     return actions.map(a =>{
       const data = a.payload.doc.data();
       const id = a.payload.doc.id;
       return {id, data}
     })
   }))
 }

 loadOneData(id : any){
  return this.afs.doc(`annonces/${id}`).valueChanges();
}

updateData(id: any, annonceData: any){

  this.afs.doc(`annonces/${id}`).update(annonceData).then(()=>{
    this.toastr.success('Data updated successfully');
    this.router.navigate(['/annonces'])
  })
 }

 deleteImage(annonceImgPath: any, id: any){
  this.storage.storage.refFromURL(annonceImgPath).delete().then(() =>{
    this.deleteData(id);
  })
 }

 deleteData(id: any){
  this.afs.doc(`annonces/${id}`).delete().then(()=>{
    this.toastr.warning('Data deleted ...!');

  })
 }

 markactive(id: any, activeData: any){

  this.afs.doc(`annonces/${id}`).update(activeData).then(()=>{
    this.toastr.info('active Status updated')
  })
 }
}
