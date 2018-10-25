import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { IssueCredentialsComponent } from './issue-credentials/issue-credentials.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'issue-credentials'
      },
      {
        path: 'issue-credentials',
        component: IssueCredentialsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [AuthComponent, IssueCredentialsComponent]
})
export class AuthModule {
}
