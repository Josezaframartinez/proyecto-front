import { Component } from '@angular/core';
import { environment } from '../app/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lo que sea';

  ngOnInit() {
    console.log(environment.production); 
  }
}