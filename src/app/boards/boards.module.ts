import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { BoardsComponent } from './boards.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCardModule, MatListModule, MatTableModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: BoardsListComponent
      },
      {
        path: ':boardId/detail',
        component: BoardDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatListModule
  ],
  declarations: [
    BoardsListComponent,
    BoardsComponent,
    BoardDetailComponent
  ]
})
export class BoardsModule {
}
