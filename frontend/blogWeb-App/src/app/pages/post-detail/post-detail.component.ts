import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../service/post.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: any;
  comments: any[] = [];
  newComment = '';
  isEditable = false;
  isEditing = false;
  editedContent = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];
    this.loadPost(postId);
    this.loadComments(postId);
  }

  loadPost(postId: number) {
    this.postService.getPostById(postId).subscribe({
      next: (res: any) => {
        this.post = res;
        this.editedContent = res.content;
        this.isEditable = res.isEditable; 
      },
      error: (err: any) => { 
        this.snackBar.open('Error loading post', 'Close', { duration: 3000 });
      }
    });
  }

  updatePost() {
    const updatedPost = {
      title: this.post.title,
      content: this.editedContent
    };
    
    this.postService.updatePost(this.post.id, updatedPost).subscribe({
      next: () => {
        this.snackBar.open('Post updated successfully', 'Close', { duration: 3000 });
        this.isEditing = false;
        this.loadPost(this.post.id);
      },
      error: (err) => {
        this.snackBar.open('Error updating post: ' + err.message, 'Close', { duration: 5000 });
      }
    });
  }

  loadComments(postId: number) {
    this.postService.getComments(postId).subscribe({
      next: (res) => {
        this.comments = res;
      },
      error: (err) => {
        this.snackBar.open('Error loading comments', 'Close');
      }
    });
  }

  addComment() {
    if (!this.post?.id) {
      this.snackBar.open('Post not loaded yet', 'Close');
      return;
    }
  
    if (!this.newComment.trim()) {
      this.snackBar.open('Comment cannot be empty', 'Close');
      return;
    }
  
    this.isLoading = true;
    this.postService.addComment(this.post.id, this.newComment).subscribe({
      next: (newComment) => {
        this.comments = [newComment, ...this.comments];
        this.newComment = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open(
          err.error?.message || 'Error adding comment',
          'Close',
          { duration: 5000 }
        );
      }
    });
  }

}