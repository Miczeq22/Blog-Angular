import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ArticlesComponent } from './articles/articles.component';
import { LoggedGuard } from './logged.guard';
import { ArticleThumbnailComponent } from './article-thumbnail/article-thumbnail.component';
import { TextShorterPipe } from './text-shorter.pipe';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { CommentComponent } from './comment/comment.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { AdminGuard } from './admin.guard';
import { RegisterComponent } from './register/register.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ArticlesComponent,
    ArticleThumbnailComponent,
    TextShorterPipe,
    ArticleDetailsComponent,
    CommentComponent,
    AddArticleComponent,
    RegisterComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [LoggedGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
