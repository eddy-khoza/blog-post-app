import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  posts: any[] = [];
  totalPosts = 0;
  pageSize = 5;
  pageIndex = 0;
  isLoading = false;

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserPosts();
  }

  loadUserPosts() {
    this.isLoading = true;
    this.postService.getUserPosts(this.pageIndex, this.pageSize).subscribe({
      next: (res: any) => {
        this.posts = res.content;
        this.totalPosts = res.totalElements;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.snackBar.open('Error loading your posts', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUserPosts();
  }

  viewPost(id: number) {
    this.router.navigate(['/post', id]);
  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.snackBar.open('Post deleted successfully', 'Close', { duration: 3000 });
          this.loadUserPosts();
        },
        error: (err: any) => {
          this.snackBar.open('Error deleting post: ' + err.message, 'Close');
        }
      });
    }
  }
}