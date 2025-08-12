package com.eddy.BlogPostApp.Service;

import com.eddy.BlogPostApp.Entity.Post;
import java.util.List;

public interface PostService {
    Post savePost(Post post);
    List<Post> getAllPosts();
}