import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredPostArray !: any[];
  latestPostArray !: any[];

  constructor( private postService : PostService) {

    this.postService.loadFeatured().subscribe(val=>{
      this.featuredPostArray = val;
    })

    this.postService.loadLatest().subscribe(val =>{
      this.latestPostArray = val
    })
   }

  ngOnInit(): void {

  }

}
