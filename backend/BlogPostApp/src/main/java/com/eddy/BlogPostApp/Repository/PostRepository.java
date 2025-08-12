package com.eddy.BlogPostApp.Repository;

import com.eddy.BlogPostApp.Entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Post> findByPostedByOrderByCreatedAtDesc(String postedBy, Pageable pageable);
}