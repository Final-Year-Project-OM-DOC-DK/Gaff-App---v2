import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TodolistPage } from './todolist.page';

const routes: Routes = [
  {
    path: '',
    component: TodolistPage,
    children: [
      { path: 'add-todo', loadChildren: './add-todo/add-todo.module#Add-todoPageModule'},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TodolistPage]
})
export class TodolistPageModule {}
