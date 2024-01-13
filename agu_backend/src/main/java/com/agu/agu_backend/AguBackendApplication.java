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

import java.util.Arrays;
import java.util.stream.IntStream;

/**
 * Agu service
 *
 */
@SpringBootApplication
public class AguBackendApplication implements CommandLineRunner {

	@Autowired
	private DataService dataService;
	@Autowired
	private ArticleService articleService;

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
		IntStream.range(1, 5).forEach( i -> {
//			articleService.createArticle("author" + i, "title" + i, "content" + i, "videoLink" + i);
			articleService.createArticle("username" + i,
					"Carrying and Holding a Newborn" + i,
					"Wash your hands. Always wash your hands or use hand sanitizer before you handle a newborn. A newborn's immune system is not strong yet, and you do not want to pass on any germs or infections. If you have visitors or guests, make sure they wash their hands before handling the newborn.[1]\n" +
							"Keep hand sanitizer in rooms where you typically hold the baby. This way it is convenient for you and any guests to clean their hands.\n" +
							"Cradle the newborn. Cradling is an intimate way to hold a newborn that allows you to interact with the baby. Rest the baby's head on your chest, and slide your hand from the bottom to support the neck. Move the baby's head to the crook of your arm to support the neck. Once the baby is securely in the crook of your arm, place your other hand under the baby's bottom.[5]\n" +
							"Don't forget to continually support the baby's head and neck as you position the baby.\n" +
							"It may be better to sit and hold the baby instead of standing up until you are more comfortable.\nHold the newborn on your shoulder. Rest the newborn on your shoulder and use your hand to support the head and neck. Place your other hand on the baby's bottom. Try to allow the baby to see over your shoulder. The baby will enjoy the view.[6]\n" +
							"Be sure you have a good hold if you are walking up or down the stairs with the newborn on your shoulder.\nUse a baby sling or carrier. Baby slings and carriers are safe for newborns and allow you to use your hands while toting the baby. Always read the instructions and check the weight minimum before you use it. Your baby's face should never be covered by the sling or your body. If you can see your baby's face, you should be fine.[7]\n" +
							"Always bend at the knees when carrying your baby in one of these.\n" +
							"Make sure the carrier fits firmly around your waist and shoulders.\n\n" +
							"Be gentle. A newborn is not ready for any type of rough play. Do not shake, bounce on your knee, or throw the baby in the air. If your newborn is in a carrier, sling, stroller, or car seat, try to limit excessive bouncing or anything rough.[8]\n" +
							"Shaking can cause brain bleeding and even death.[9]\n" +
							"You can always tickle the bottom of the newborn's feet or blow on her cheek.",
					Arrays.asList("https://www.wikihow.com/Handle-a-Newborn-Baby"),
					Arrays.asList(
							"G9dYOmLBwIM",
							"XKfTTHqbk-4",
							"G9dYOmLBwIM",
							"XKfTTHqbk-4"
					),
					Arrays.asList("https://www.wikihow.com/images/thumb/b/bf/Handle-a-Newborn-Baby-Step-1-Version-2.jpg/aid1203442-v4-728px-Handle-a-Newborn-Baby-Step-1-Version-2.jpg.webp",
							"https://www.wikihow.com/images/thumb/c/c1/Handle-a-Newborn-Baby-Step-2-Version-2.jpg/aid1203442-v4-728px-Handle-a-Newborn-Baby-Step-2-Version-2.jpg.webp",
							"https://www.wikihow.com/images/thumb/b/b0/Handle-a-Newborn-Baby-Step-3-Version-2.jpg/aid1203442-v4-728px-Handle-a-Newborn-Baby-Step-3-Version-2.jpg.webp",
							"https://www.wikihow.com/images/thumb/b/b9/Handle-a-Newborn-Baby-Step-4-Version-2.jpg/aid1203442-v4-728px-Handle-a-Newborn-Baby-Step-4-Version-2.jpg.webp",
							"https://www.wikihow.com/images/thumb/4/4a/Handle-a-Newborn-Baby-Step-5-Version-2.jpg/aid1203442-v4-728px-Handle-a-Newborn-Baby-Step-5-Version-2.jpg.webp",
							"https://www.wikihow.com/images/thumb/e/ee/Handle-a-Newborn-Baby-Step-6-Version-2.jpg/aid1203442-v4-728px-Handle-a-Newborn-Baby-Step-6-Version-2.jpg.webp"
					));
		});

	}
}
