import { Component, OnInit } from '@angular/core';
import { Comment } from '../model/comment.model';
import { Input } from '@angular/core';
import { UserService } from '../user.service';
import { JwtHelper } from 'angular2-jwt';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [UserService, CommentService]
})
export class CommentComponent implements OnInit {

  @Input()
  comment: Comment;
  username: string;
  isLoggedUser: boolean;
  commentForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private commtentService: CommentService) { }

  ngOnInit() {
    if (this.comment.userId) {
      this.userService.getOneById(this.comment.userId).subscribe((data: any) => {
        this.username = data.user.username;
      });
    }

    this.commentForm = this.formBuilder.group({
      id: new FormControl(''),
      title: new FormControl(this.comment.title, [Validators.required]),
      content: new FormControl('', [Validators.required])
    });

    const token = localStorage.getItem('token');

    if (token) {
      const jwtHelper = new JwtHelper();

      if (!jwtHelper.isTokenExpired(token) && jwtHelper.decodeToken(token).role) {
        if (jwtHelper.decodeToken(token).id === this.comment.userId) {
          this.isLoggedUser = true;
        }
      }
    }
  }

  edit() {
    this.commentForm.patchValue({
      id: this.comment.id,
      title: this.comment.title,
      content: this.comment.content
    });
  }

  remove() {
    this.commtentService.remove(this.comment.id).subscribe((data: any) => {
      location.reload();
    });
  }

  get id() {
    return this.commentForm.get('id');
  }

  get title() {
    return this.commentForm.get('title');
  }

  get content() {
    return this.commentForm.get('content');
  }

}
