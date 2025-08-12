package com.eddy.BlogPostApp.Service;

import com.eddy.BlogPostApp.Entity.Post;
import com.eddy.BlogPostApp.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
public class PostServiceImpl implements PostService {
    @Autowired
    private PostRepository postRepository;

    @Override
    public Post createPost(Post post) {
        post.setCreatedAt(new Date());
        post.setLinkCount(0);
        post.setViewCount(0);

        return postRepository.save(post);
    }

    @Override
    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    @Override
    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }

    @Override
    public Post updatePost(Long id, Post post, String currentUser) {
        Post existingPost = getPostById(id);
        if (!existingPost.getPostedBy().equals(currentUser)) {
            throw new RuntimeException("You can only update your own posts");
        }
        if (!existingPost.isEditable()) {
            throw new RuntimeException("Post can only be edited within 15 minutes of creation");
        }
        existingPost.setTitle(post.getTitle());
        existingPost.setContent(post.getContent());
        return postRepository.save(existingPost);
    }

    @Override
    public void deletePost(Long id, String currentUser) {
        Post post = getPostById(id);
        if (!post.getPostedBy().equals(currentUser)) {
            throw new RuntimeException("Unauthorized: You can only delete your own posts. Expected: "
                    + post.getPostedBy() + " but got: " + currentUser);
        }
        postRepository.delete(post);
    }

    @Override
    public Page<Post> getPostsByUser(String username, Pageable pageable) {
        return postRepository.findByPostedByOrderByCreatedAtDesc(username, pageable);
    }
}