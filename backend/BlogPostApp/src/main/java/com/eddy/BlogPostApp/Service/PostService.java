package com.eddy.BlogPostApp.Service;

import com.eddy.BlogPostApp.Entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

public interface PostService {
    Post createPost(Post post);
    Page<Post> getAllPosts(Pageable pageable);
    Post getPostById(Long id);
    Post updatePost(Long id, Post post, String currentUser);
    void deletePost(Long id, String currentUser);
    Page<Post> getPostsByUser(String username, Pageable pageable);
}