package com.example.jwt.service;

import com.example.jwt.entity.Blog;
import com.example.jwt.repository.BlogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    private final BlogRepository blogRepository;

    // Constructor-based injection
    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    // Save a new blog
    public void saveMyBlog(Blog blog) {
        blogRepository.save(blog);
    }

    // Retrieve all blogs for a given user ID
    public List<Blog> getAll(Long userId) {
        return blogRepository.findBlogsByUserId(userId);
    }

    // Update an existing blog
    public Blog updateBlog(Long blogId, Blog updatedBlog) {
        Optional<Blog> existingBlog = blogRepository.findById(blogId);
        if (existingBlog.isPresent()) {
            Blog blog = existingBlog.get();
            blog.setBlogTitle(updatedBlog.getBlogTitle());
            blog.setBlogContent(updatedBlog.getBlogContent());
            return blogRepository.save(blog);
        }
        return null;
    }

    // Delete a blog by ID
    public boolean deleteBlog(Long blogId) {
        if (blogRepository.existsById(blogId)) {
            blogRepository.deleteById(blogId);
            return true;
        }
        return false;
    }
}
