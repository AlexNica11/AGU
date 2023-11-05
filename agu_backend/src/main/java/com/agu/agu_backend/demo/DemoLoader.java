package com.agu.agu_backend.demo;

import com.agu.agu_backend.model.Article;
import com.agu.agu_backend.repo.ArticleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DemoLoader implements CommandLineRunner {

    private final ArticleRepo repository;

    @Autowired
    public DemoLoader(ArticleRepo repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new Article("Emmanuel", "Idk", "Some Content"));
    }
}
