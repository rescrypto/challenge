import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {ProductComponent} from './menu/product/product.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
    data: {title: 'Menu'},
    children: [{
      path: ':id',
      component: ProductComponent
    }]
  },
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/menu'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
