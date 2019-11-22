import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'terms', loadChildren: './terms/terms.module#TermsPageModule' },
  { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyPageModule' },
  { path: 'house-select', loadChildren: './house-select/house-select.module#HouseSelectPageModule' },
  { path: 'house-select:id', loadChildren: './house-select/house-select.module#HouseSelectPageModule' },
  { path: 'todolist', loadChildren: './todolist/todolist.module#TodolistPageModule' },
  { path: 'calander', loadChildren: './calander/calander.module#CalanderPageModule' },
  { path: 'forum', loadChildren: './forum/forum.module#ForumPageModule' },
  { path: 'shoppinglist', loadChildren: './shoppinglist/shoppinglist.module#ShoppinglistPageModule' },
  { path: 'bills', loadChildren: './bills/bills.module#BillsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
