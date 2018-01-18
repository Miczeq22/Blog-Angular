import { Component, OnInit } from '@angular/core';
import { Article } from '../model/article.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ArticleService]
})
export class ArticlesComponent implements OnInit {

  articles: Array<Article>;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getAll().subscribe((data: any) => {
      this.articles = data.articles;
    });
  }

}
