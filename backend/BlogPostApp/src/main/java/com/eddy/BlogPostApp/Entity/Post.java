package com.eddy.BlogPostApp.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(length = 250, nullable = false)
    private String content;

    @Column(nullable = false)
    private String postedBy;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private Integer linkCount = 0;

    @Column(nullable = false, columnDefinition = "integer default 0")
    private Integer viewCount = 0;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    public boolean isEditable() {
        long FIFTEEN_MINUTES = 15 * 60 * 1000;
        return (new Date().getTime() - this.createdAt.getTime()) < FIFTEEN_MINUTES;
    }
}