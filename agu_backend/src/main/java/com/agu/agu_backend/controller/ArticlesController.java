package com.agu.agu_backend.controller;

import com.agu.agu_backend.model.Article;
import com.agu.agu_backend.repo.ArticleRepo;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/articles")
public class ArticlesController {
    private ArticleRepo articleRepository;

    public ArticlesController(ArticleRepo articleRepository) {
        this.articleRepository = articleRepository;
    }

    @PostMapping("/contacts")
    ResponseEntity<Article> createArticle(@Valid @RequestBody Article article) {
        Article result = articleRepository.save(article);
        return ResponseEntity.ok().body(result);
    }
}
