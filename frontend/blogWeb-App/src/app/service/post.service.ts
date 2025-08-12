import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8081/api/";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private currentUser = "Current User";
  constructor(private http: HttpClient) { }

  getUserPosts(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    const headers = new HttpHeaders().set('X-User', this.currentUser);
    return this.http.get(`${BASE_URL}posts/user`, { params, headers });
  }

  createPost(post: any): Observable<any> {
    const headers = new HttpHeaders().set('X-User', this.currentUser);
    const postWithUser = {
      ...post,
      postedBy: this.currentUser
    };
    return this.http.post(BASE_URL + 'posts', postWithUser, { headers });
  }

  getAllPosts(page?: number, size?: number): Observable<any> {
    let params = new HttpParams();
    if (page !== undefined && size !== undefined) {
      params = params.set('page', page.toString()).set('size', size.toString());
    }
    return this.http.get(BASE_URL + 'posts', { params });
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(BASE_URL + 'posts/' + id);
  }

  updatePost(id: number, post: any): Observable<any> {
    const headers = new HttpHeaders().set('X-User', this.currentUser);
    return this.http.put(BASE_URL + 'posts/' + id, post, { headers });
  }

  deletePost(id: number): Observable<any> {
    const headers = new HttpHeaders().set('X-User', this.currentUser);
    return this.http.delete(BASE_URL + 'posts/' + id, { headers });
  }

  addComment(postId: number, commentText: string): Observable<Comment> {
    const comment = {
      content: commentText,
      postedBy: this.currentUser,
      createdAt: new Date().toISOString()
    };
    
    return this.http.post<Comment>(
      `${BASE_URL}posts/${postId}/comments`, 
      comment
    );
  }

  getComments(postId: number): Observable<any> {
    return this.http.get(BASE_URL + 'posts/' + postId + '/comments');
  }
}