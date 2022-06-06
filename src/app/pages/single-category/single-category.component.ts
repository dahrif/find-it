import { Category } from './../../../../../info-social-admin/src/app/models/category';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {

  postArray !: any[];
  categoryObj !: any;

  constructor(private route: ActivatedRoute, private postService : PostService) { }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.categoryObj = val

      this.postService.loadCategoryPost(val['id']).subscribe(post =>{ this.postArray = post;

      })
    })
  }

}
