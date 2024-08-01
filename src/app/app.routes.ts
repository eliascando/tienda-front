import { Routes } from '@angular/router';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { ProductosComponent } from './components/productos/productos.component';

export const routes: Routes = [
    {
        path:'productos',
        component: ProductosComponent
    },
    {
        path: 'favoritos',
        component: FavoritosComponent
    }
];
