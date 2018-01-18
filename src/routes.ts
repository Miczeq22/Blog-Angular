import { Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { ArticlesComponent } from './app/articles/articles.component';
import { LoggedGuard } from './app/logged.guard';
import { ArticleDetailsComponent } from './app/article-details/article-details.component';
import { AddArticleComponent } from './app/add-article/add-article.component';
import { AdminGuard } from './app/admin.guard';
import { RegisterComponent } from './app/register/register.component';
import { EditUserComponent } from './app/edit-user/edit-user.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'articles', component: ArticlesComponent, canActivate: [LoggedGuard] },
  { path: 'article/:id', component: ArticleDetailsComponent, canActivate: [LoggedGuard] },
  { path: 'add-article', component: AddArticleComponent, canActivate: [AdminGuard] },
  { path: 'edit-article/:id', component: AddArticleComponent, canActivate: [AdminGuard] },
  { path: 'edit-user', component: EditUserComponent, canActivate: [LoggedGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
