import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html'
})
export class DataViewerComponent implements OnInit {
  items: any[] = [];

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.databaseService.getData().subscribe(data => {
      this.items = data;
    }, error => {
      console.error('Error fetching data: ', error);
    });
  }
}
