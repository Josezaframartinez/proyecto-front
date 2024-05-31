import { RouterLink, RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { NgModule } from '@angular/core';
import { AcercaDeComponent } from './acercade/acercade.component';
import { InicioComponent } from './inicio/inicio.component';
import { PasosComponent } from './pasos/Pasos.component';
import { InicioSesionComponent } from './iniciosesion/iniciosesion.component';
import { ProductosHandlerComponent } from './ProductosHandler/ProductosHandler.component';


export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'nosotros', component: AcercaDeComponent },
    { path: 'pasos', component: PasosComponent },
    { path: 'iniciosesion', component: InicioSesionComponent },
    { path: 'ProductosHandler', component: ProductosHandlerComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes),RouterLink ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}