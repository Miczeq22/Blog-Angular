import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../model/article.model';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../model/comment.model';
import { CommentService } from '../comment.service';
import { JwtHelper } from 'angular2-jwt';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
  providers: [ArticleService, CommentService]
})
export class ArticleDetailsComponent implements OnInit {

  article: Article;
  comments: Array<Comment>;
  isAdmin: boolean;

  commentForm: FormGroup;
  userId: number;

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private commentService: CommentService,
  private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.articleService.getOne(id).subscribe((data: any) => {
          this.article = data.article;
        });
        this.commentService.getAllForArticle(id).subscribe((data: any) => {
          this.comments = data.comments;
        });
      }
    });

    this.commentForm = this.formBuilder.group({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });

    const token = localStorage.getItem('token');
    if (token) {
      const jwtHelper = new JwtHelper();
      if (!jwtHelper.isTokenExpired(token)) {
        if (jwtHelper.decodeToken(token).role === 'ROLE_ADMIN') {
        this.isAdmin = true;
        }
        this.userId = jwtHelper.decodeToken(token).id;
      }
    }
  }

  addComment(): void {
    const comment: Comment = {
    articleId: this.article.id,
    content: this.commentContent.value,
    title: this.commentTitle.value,
    userId: this.userId
    };

    this.commentService.save(comment).subscribe((data: any) => {
      location.reload();
    });
  }

  remove() {
    this.articleService.remove(this.article.id).subscribe((data: any) => {
      this.router.navigate(['/articles']);
    });
  }

  get commentTitle() {
    return this.commentForm.get('title');
  }

  get commentContent() {
    return this.commentForm.get('content');
  }

  get id() {
    return this.commentForm.get('id');
  }

}
