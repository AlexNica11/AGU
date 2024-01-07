package com.agu.agu_backend.controller;

import com.agu.agu_backend.model.Article;
import com.agu.agu_backend.repo.ArticleRepository;
import jakarta.validation.Valid;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Objects;

/**
 * Class for accessing the articles API
 *
 */
@RestController
@RequestMapping("/articles")
public class ArticleController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionHandlerController.class);
    private ArticleRepository articleRepository;

    @Autowired
    public ArticleController(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @GetMapping
    public Collection<Article> articles() {
        return (Collection<Article>) articleRepository.findAll();
    }

    @GetMapping(path = "/{articleId}")
    public Article getArticle(@PathVariable(value = "articleId") String articledId) throws NoSuchElementException{
        return articleRepository.findById(articledId).get();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createArticle(@Valid @RequestBody Article article) {
        articleRepository.save(new Article(article.getAuthor(),
                article.getTitle(),
                article.getContent(),
                article.getVideoLink()));
    }

    @PutMapping(path = "/{articleId}")
    public Article updateArticle(@PathVariable(value = "articleId") String articledId,
                              @RequestBody @Validated Article article){
        try {
            Article updatedArticle = articleRepository.findById(articledId).get();

            updatedArticle.setAuthor(article.getAuthor());
            updatedArticle.setTitle(article.getTitle());
            updatedArticle.setContent(article.getContent());
            updatedArticle.setVideoLink(article.getVideoLink());

            return articleRepository.save(updatedArticle);
        } catch (NoSuchElementException exception){
            return article;
        }
    }

    @DeleteMapping(path = "/{articleId}")
    public void deleteArticle(@PathVariable(value = "articleId") String articledId){
        articleRepository.deleteById(articledId);
    }

    /**
     * Exception handler if NoSuchElementException is thrown in this Controller
     *
     * @param ex exception
     * @return Error message String.
     */
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoSuchElementException.class)
    public String return400(NoSuchElementException ex) {
        LOGGER.error("Unable to complete transaction", ex);
        return ex.getMessage();
    }

//    @PostMapping
//    ResponseEntity<Article> createArticle(@Valid @RequestBody Article article) {
//        Article result = articleRepository.save(article);
//        return ResponseEntity.ok().body(result);
//    }
}
