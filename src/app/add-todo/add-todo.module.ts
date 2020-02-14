import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddTodoPage } from './add-todo.page';

const routes: Routes = [
  {
<<<<<<< HEAD
    path: 'add-todo',
=======
    path: '',
>>>>>>> 5dad1eb5db3e8f7ab1d941f9d1f27ee94b128222
    component: AddTodoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddTodoPage]
})
export class AddTodoPageModule {}
