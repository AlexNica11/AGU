package com.agu.agu_backend.repo;

import com.agu.agu_backend.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ArticleRepo extends CrudRepository<Article, Integer> {
    List<Article> findByAuthor(String author);
}
