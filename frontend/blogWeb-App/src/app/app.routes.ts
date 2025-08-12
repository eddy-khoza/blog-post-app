import { Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllPostsComponent } from './pages/view-all-posts/view-all-posts.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';

export const routes: Routes = [
    { path: '', redirectTo: '/view-all-posts', pathMatch: 'full' },
    { path: 'create-post', component: CreatePostComponent },
    { path: 'view-all-posts', component: ViewAllPostsComponent },
    { path: 'my-posts', component: UserPostsComponent },
    { path: 'post/:id', component: PostDetailComponent }
];