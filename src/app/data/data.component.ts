// import { Component, OnInit } from '@angular/core';
// import { DatabaseService } from './services/database.service';

// @Component({
//   selector: 'app-data-component',
//   template: `
//     <div *ngFor="let item of data">
//       {{ item.name }}
//     </div>
//   `
// })
// export class DataComponent implements OnInit {
//   data: any[] = [];

//   constructor(private dbService: DatabaseService) {}

//   ngOnInit() {
//     this.dbService.getData().subscribe(data => {
//       this.data = data;
//     });
//   }
// }
