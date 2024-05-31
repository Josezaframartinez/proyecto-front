import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // Necessary for any app that runs in the browser
import { HttpClientModule } from '@angular/common/http'; // Important for making HTTP calls
import { FormsModule } from '@angular/forms'; // Necessary for using [(ngModel)] in forms
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Snackbar module for notifications
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Necessary for animations

// Import your components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes'; // Make sure your routes are well defined in this module
import { InicioSesionComponent } from './iniciosesion/iniciosesion.component'; // Login component
import { FooterComponent } from './footer/footer.component'; // Footer component
import { HeaderComponent } from './header/header.component'; // Header component
import { MyNavComponent } from './my-nav/my-nav.component'; // Navigation component
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component'; // Dashboard component
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MyTableComponent } from './my-table/my-table.component'; // Table component
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Sorting module for tables

@NgModule({
    declarations: [
        AppComponent,
        InicioSesionComponent,
        FooterComponent,
        HeaderComponent,
        MyNavComponent,
        MyDashboardComponent,
        MyTableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule, // This module should contain your app's routes
        HttpClientModule, // Enables HttpClient throughout the app
        FormsModule,
        BrowserAnimationsModule, // Needed for Angular Material components that require animations
        MatSnackBarModule, // Now correctly included for use in the app
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    providers: [
    provideAnimationsAsync()
  ], // Removed provideAnimationsAsync() which was incorrectly used here
    bootstrap: [AppComponent] // The root component that Angular uses to boot the application
})
export class AppModule { }
