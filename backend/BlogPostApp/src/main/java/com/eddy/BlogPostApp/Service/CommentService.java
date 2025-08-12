package com.eddy.BlogPostApp.Service;

import com.eddy.BlogPostApp.Entity.Comment;
import java.util.List;

public interface CommentService {
    Comment addComment(Long postId, Comment comment);
    List<Comment> getCommentsByPostId(Long postId);
}