import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontEndEntrevista';
  constructor(private router: Router){}
  goTo(ruta: string) {
    this.router.navigate([ruta]);
  }
}
