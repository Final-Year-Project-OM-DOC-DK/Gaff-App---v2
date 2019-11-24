import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HouseDetailsPage } from './house-details.page';

//added children to the routes so that it can go to selected menu options
const routes: Routes = [
  {
    path: 'menu',
    component: HouseDetailsPage,
    children: [
      { path: 'todolist', loadChildren: '../todolist/todolist.module#TodolistPageModule' },
      { path: 'calander', loadChildren: '../calander/calander.module#CalanderPageModule' },
      { path: 'forum', loadChildren: '../forum/forum.module#ForumPageModule' },
      { path: 'shoppinglist', loadChildren: '../shoppinglist/shoppinglist.module#ShoppinglistPageModule' },
      { path: 'bills', loadChildren: '../bills/bills.module#BillsPageModule' }
    ]
  },
  {
    path: '',
    redirectTo: 'menu/todolist'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HouseDetailsPage]
})
export class HouseDetailsPageModule { }
