import { Router } from '@angular/router';


export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/login']);
    }
  }
}
