import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { JwtHelper } from 'angular2-jwt';
import { Article } from '../model/article.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
  providers: [ArticleService]
})
export class AddArticleComponent implements OnInit {

  articleForm: FormGroup;
  userId: number;
  articleId: number;

  constructor(private articleService: ArticleService, private formBuilder: FormBuilder, private router: Router,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.articleForm = this.formBuilder.group({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      imgUrl: new FormControl('', [Validators.required])
    });

    const token = localStorage.getItem('token');

    if (token) {
      const jwtHelper = new JwtHelper();

      if (!jwtHelper.isTokenExpired(token) && jwtHelper.decodeToken(token).role === 'ROLE_ADMIN') {
        this.userId = jwtHelper.decodeToken(token).id;
      }
    }

    this.route.params.subscribe(params => {
      this.articleId = params['id'];
      if (this.articleId) {
          this.articleService.getOne(this.articleId).subscribe((data: any) => {
            this.articleForm.patchValue({
              id: data.article.id,
              title: data.article.title,
              content: data.article.content,
              imgUrl: data.article.imgUrl,
            });
          });
        }
      });
  }

  submit() {
    let article: Article;

    if (this.articleId) {
      article = {
        id: this.articleId,
        title: this.title.value,
        content: this.content.value,
        imgUrl: this.imgUrl.value,
        userId: this.userId
      };
    } else {
      article = {
        title: this.title.value,
        content: this.content.value,
        imgUrl: this.imgUrl.value,
        userId: this.userId
      };
    }

    this.articleService.save(article).subscribe((data: any) => {
      console.log('xD');
      console.log(data);
      if (data.status) {
        this.router.navigate(['/articles']);
      }
    });
  }

  get id() {
    return this.articleForm.get('id');
  }

  get title() {
    return this.articleForm.get('title');
  }

  get content() {
    return this.articleForm.get('content');
  }

  get imgUrl() {
    return this.articleForm.get('imgUrl');
  }

}
