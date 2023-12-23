package com.agu.agu_backend.service;

import com.agu.agu_backend.model.Article;
import com.agu.agu_backend.repo.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    private ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository){
        this.articleRepository = articleRepository;
    }

    public Article createArticle(String author, String title, String content, String videoLink){
        return articleRepository.save(new Article(author, title, content, videoLink));
    }

}
