package com.agu.agu_backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
@Table(name="ARTICLE")
public class Article {

    @Id
    @GeneratedValue
    private Integer id;

    @Column
    @Getter
    @Setter
    private String author;

    @Column
    @Getter
    @Setter
    private String content;

    public Article(String author, String content) {
        this.author = author;
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
        return "Article{author=" + author + ", content=" + content + "}" ;
    }
}
