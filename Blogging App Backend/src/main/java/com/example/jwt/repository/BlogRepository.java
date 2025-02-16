package com.example.jwt.repository;

import com.example.jwt.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {

    // Retrieve all blogs by user ID
    @Query("SELECT b FROM Blog b WHERE b.userId = :userId")
    List<Blog> findBlogsByUserId(@Param("userId") Long userId);
}
