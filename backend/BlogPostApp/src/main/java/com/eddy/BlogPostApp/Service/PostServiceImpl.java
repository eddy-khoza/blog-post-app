package com.eddy.BlogPostApp.Service;

import com.eddy.BlogPostApp.Entity.Post;
import com.eddy.BlogPostApp.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;

    @Override
    public Post savePost(Post post) {
        post.setLinkCount(0);
        post.setViewCount(0);
        post.setDate(new java.util.Date());
        return postRepository.save(post);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}