package com.agu.agu_backend.model;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Document
public class Article {

    @Id
    @Getter
    private String id;

    @Indexed
    @NonNull
    @Getter
    @Setter
    private String author;

    @Indexed
    @NonNull
    @Getter
    @Setter
    private String title;

    @Getter
    @Setter
    private String content;

    @Getter
    @Setter
    private List<String> sources;

    @Getter
    @Setter
    private List<String> videoLinks;

    @Getter
    @Setter
    private List<String> imageLinks;

    public Article(@NonNull String author, @NonNull String title, String content, List<String> sources, List<String> videoLinks, List<String> imageLinks) {
        this.author = author;
        this.title = title;
        this.content = content;
        this.sources = sources;
        this.videoLinks = videoLinks;
        this.imageLinks = imageLinks;
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
        return "Article{" +
                "id='" + id + '\'' +
                ", author='" + author + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", videoLinks=" + videoLinks +
                ", imageLinks=" + imageLinks +
                '}';
    }
}
