package com.springboot.LibroFlow;

import com.springboot.LibroFlow.entity.Book;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LibroFlowApplication  {

	public static void main(String[] args) {
		SpringApplication.run(LibroFlowApplication.class, args);
	}

//	@Override
//	public void run(String... args) throws Exception {
//		Book book1 = new Book();
//		book1.setTitle("Book 1");
//		book1.setAuthor("Author 1");
//		Book book2 = new Book();
//		book2.setTitle("Book 2");
//		book2.setAuthor("Author 2");
//	}
}
