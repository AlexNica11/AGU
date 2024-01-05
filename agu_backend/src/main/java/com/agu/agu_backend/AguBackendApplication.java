package com.agu.agu_backend;

import com.agu.agu_backend.repo.ArticleRepository;
import com.agu.agu_backend.service.ArticleService;
import com.agu.agu_backend.service.DataService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

import java.util.stream.IntStream;

/**
 * Agu service
 *
 */
@SpringBootApplication
public class AguBackendApplication implements CommandLineRunner {

	@Autowired
	private DataService dataService;

	public static void main(String[] args) {
		SpringApplication.run(AguBackendApplication.class, args);
	}

	/**
	 * Utility function to run commands at service start-up
	 *
	 * @param args incoming main method arguments
	 * @throws Exception
	 */
	@Override
	public void run(String... args) throws Exception {
//		createAllArticles();
//		dataService.setData();
	}

	private void createAllArticles(){
//		IntStream.range(0, 10).forEach( i -> {
//			articleService.createArticle("author" + i, "title" + i, "content" + i, "videoLink" + i);
//		});
	}
}
