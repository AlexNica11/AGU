package com.agu.agu_backend.repo;

import com.agu.agu_backend.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ArticleRepository extends MongoRepository<Article, String> {
    List<Article> findByAuthor(String author);
    List<Article> findByTitle(String title);
}
