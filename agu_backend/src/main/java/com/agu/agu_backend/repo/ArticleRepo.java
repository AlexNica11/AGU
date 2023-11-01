package com.agu.agu_backend.repo;

import com.agu.agu_backend.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepo extends JpaRepository<Article, Integer> {
    List<Article> findByAuthor(String author);
}
