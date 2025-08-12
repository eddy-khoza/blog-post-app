package com.eddy.BlogPostApp.Service;

import com.eddy.BlogPostApp.Entity.Comment;
import com.eddy.BlogPostApp.Entity.Post;
import com.eddy.BlogPostApp.Repository.CommentRepository;
import com.eddy.BlogPostApp.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Comment addComment(Long postId, Comment comment) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (comment.getCreatedAt() == null) {
            comment.setCreatedAt(new Date());
        }

        comment.setPost(post);
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
    }
}