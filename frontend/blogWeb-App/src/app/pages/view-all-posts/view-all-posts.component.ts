import { PostService } from './../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from "../../AngularMaterialModule";

@Component({
  selector: 'app-view-all-posts',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './view-all-posts.component.html',
  styleUrl: './view-all-posts.component.scss'
})
export class ViewAllPostsComponent implements OnInit {
  posts$: any[] = []; // Add this property declaration

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(res => {
      console.log(res);
      this.posts$ = res;
    }, error => {
      this.snackBar.open("Something went wrong!!!", "Ok")
    });
  }
}