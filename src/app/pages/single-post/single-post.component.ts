import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  postData !: any;
  similarPostArray !: any[];

  constructor( private route: ActivatedRoute, private postService : PostService) { }

  ngOnInit(): void {

    this.route.params.subscribe(val =>{

      this.postService.countViews(val['id']);
      
      this.postService.loadOnePost(val['id']).subscribe(post =>{
        this.postData = post;
        this.loadSimilarPosts(this.postData.category.categoryId);
      })
    })

  }

  loadSimilarPosts(catId : any){
    this.postService.loadSimilarPost(catId).subscribe(val =>{
      this.similarPostArray = val;
    })
  }

}
