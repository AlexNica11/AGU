package com.agu.agu_backend.controller;

import com.agu.agu_backend.model.Article;
import com.agu.agu_backend.repo.ArticleRepo;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // address of the client
public class ArticlesController {
    private ArticleRepo articleRepository;

    public ArticlesController(ArticleRepo articleRepository) {
        this.articleRepository = articleRepository;
    }

    @GetMapping("/articles")
    Collection<Article> articles() {
        return (Collection<Article>) articleRepository.findAll();
    }

    @PostMapping("/articles")
    ResponseEntity<Article> createArticle(@Valid @RequestBody Article article) {
        Article result = articleRepository.save(article);
        return ResponseEntity.ok().body(result);
    }
}
