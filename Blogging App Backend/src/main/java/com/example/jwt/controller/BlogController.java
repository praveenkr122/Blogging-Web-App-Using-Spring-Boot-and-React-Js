package com.example.jwt.controller;

import com.example.jwt.entity.Blog;
import com.example.jwt.service.BlogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // Save a new blog
    @PostMapping("/save")
    public ResponseEntity<String> saveBlog(@RequestBody Blog blog) {
        blogService.saveMyBlog(blog);
        return ResponseEntity.ok("Blog saved successfully!");
    }

    // Get blogs for a specific user
    @GetMapping("/all")
    public ResponseEntity<List<Blog>> getAllBlogs(@RequestParam Long userId) {
        List<Blog> blogs = blogService.getAll(userId);
        return ResponseEntity.ok(blogs);
    }

    // Update a blog
    @PutMapping("/update/{blogId}")
    public ResponseEntity<String> updateBlog(@PathVariable Long blogId, @RequestBody Blog updatedBlog) {
        Blog blog = blogService.updateBlog(blogId, updatedBlog);
        if (blog != null) {
            return ResponseEntity.ok("Blog updated successfully!");
        } else {
            return ResponseEntity.badRequest().body("Blog not found!");
        }
    }

    // Delete a blog
    @DeleteMapping("/delete/{blogId}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long blogId) {
        boolean deleted = blogService.deleteBlog(blogId);
        if (deleted) {
            return ResponseEntity.ok("Blog deleted successfully!");
        } else {
            return ResponseEntity.badRequest().body("Blog not found!");
        }
    }
}


