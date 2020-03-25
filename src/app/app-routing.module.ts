import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'terms', loadChildren: './terms/terms.module#TermsPageModule' },
  { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyPageModule' },
  { path: 'house-select', loadChildren: './house-select/house-select.module#HouseSelectPageModule' },
  { path: 'todolist', loadChildren: './todolist/todolist.module#TodolistPageModule' },
  { path: 'add-todo', loadChildren:'./add-todo/add-todo.module#AddTodoPageModule'},
  { path: 'calander', loadChildren: './calander/calander.module#CalanderPageModule' },
  { path: 'forum', loadChildren: './forum/forum.module#ForumPageModule' },
  { path: 'shoppinglist', loadChildren: './shoppinglist/shoppinglist.module#ShoppinglistPageModule' },
  { path: 'bills', loadChildren: './bills/bills.module#BillsPageModule' },
  { path: 'add-house', loadChildren: './add-house/add-house.module#AddHousePageModule' },
  { path: 'house-details', loadChildren: './house-details/house-details.module#HouseDetailsPageModule' },
  { path: 'house-details:id', loadChildren: './house-details/house-details.module#HouseDetailsPageModule' },
  { path: 'add-tolist', loadChildren: './add-tolist/add-tolist.module#AddTolistPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
