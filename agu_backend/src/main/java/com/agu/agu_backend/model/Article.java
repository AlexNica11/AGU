package com.agu.agu_backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Entity
@Data
@Table(name="ARTICLE")
public class Article {

    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String author;

    @Column
    private String title;

    @Column
    private String content;

    public Article(String author, String title, String content) {
        this.author = author;
        this.title = title;
        this.content = content;
    }

    protected Article(){
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Article article = (Article) obj;
        return id.equals(article.id);
    }

    @Override
    public String toString() {
        return "Article{author=" + author + ", title=" + title + ", content=" + content + "}" ;
    }
}
