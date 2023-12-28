package com.agu.agu_backend;

import com.agu.agu_backend.repo.ArticleRepository;
import com.agu.agu_backend.service.ArticleService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

import java.util.stream.IntStream;

@SpringBootApplication
public class AguBackendApplication implements CommandLineRunner {

	@Autowired
	private ArticleService articleService;

	public static void main(String[] args) {
		SpringApplication.run(AguBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		createAllArticles();
	}

	private void createAllArticles(){
//		IntStream.range(0, 10).forEach( i -> {
//			articleService.createArticle("author" + i, "title" + i, "content" + i, "videoLink" + i);
//		});
	}
}
