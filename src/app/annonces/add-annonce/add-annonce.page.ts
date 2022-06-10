import { AnnonceService } from './../../services/annonce.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Annonce } from 'src/app/models/annonce';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../services/category.service';



@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.page.html',
  styleUrls: ['./add-annonce.page.scss'],
})
export class AddAnnoncePage implements OnInit {

  imgSrc : any = './assets/img-preview.jpg';
  selectedImg: any;
  categories !: any[];
  annonceForm!: FormGroup;
  annonce: any;
  formStatus : string = 'Add New';
  docId !: string;

  constructor(
    private categoryService : CategoryService,
    private fb: FormBuilder,
    private annonceService : AnnonceService,
    private route : ActivatedRoute
  ) { 

    this.route.queryParams.subscribe(val =>{

      this.docId = val.id;

      if (this.docId) {
        this.annonceService.loadOneData(val.id).subscribe(annonce =>{

          this.annonce = annonce;

          this.annonceForm = this.fb.group({
            category: [this.annonce.category.categoryId + '-'+this.annonce.category.category, Validators.required],
            title: [this.annonce.title,[Validators.required, Validators.minLength(10)]],
            content: [this.annonce.content,Validators.required],
            date: [this.annonce.date,Validators.required],
            lieu: [this.annonce.lieu,Validators.required],
            numTel: [this.annonce.numTel,Validators.required],
            annonceImage: [''],            
          }) 
          
          this.imgSrc = this.annonce.annonceImgPath
          this.formStatus = "Edit"
        })
      } else {
        this.annonceForm = this.fb.group({
          category: ['', Validators.required],
          title: ['',[Validators.required, Validators.minLength(10)]],
          content: ['',Validators.required],
          date: ['',Validators.required],
          lieu: ['',Validators.required],
          numTel: ['',Validators.required], 
          annonceImage: [''], 
        }) 
      }


    })
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe(val =>{
      this.categories = val
    })
  }

  get fc(){
    return this.annonceForm.controls
  }

  showPreview(event:any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc =  (e.target as any).result;
    }

    reader.readAsDataURL(event.target.files[0]);
    this.selectedImg = event.target.files[0];
  }

  onSubmit(){
    
    let splitted = this.annonceForm.value.category.split('-');
    
    const annonceData : Annonce = {
      title: this.annonceForm.value.title,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      annonceImgPath: '',
      content: this.annonceForm.value.content,
      date: this.annonceForm.value.date,
      lieu: this.annonceForm.value.lieu,
      numTel: this.annonceForm.value.numTel,
      isActive: true,
      status: 'new',
      createdAt: new Date(),
    }
    this.annonceService.uploadImage(this.selectedImg, annonceData,this.formStatus, this.docId);
    this.annonceForm.reset();

    this.imgSrc= './assets/img-preview.jpg'
  }

}
