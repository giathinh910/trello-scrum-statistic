import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientStorageService } from '../../shared/services/client-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-credentials',
  templateUrl: './issue-credentials.component.html',
  styleUrls: ['./issue-credentials.component.scss']
})
export class IssueCredentialsComponent implements OnInit {
  credentialsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private clientStorageService: ClientStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
  }

  handleFormSubmit() {
    if (this.credentialsForm.invalid) {
      return;
    }
    const { key, token } = this.credentialsForm.value;
    this.clientStorageService.setAppKey(key);
    this.clientStorageService.setAppToken(token);
    this.router.navigate(['/']);
  }

  private buildForm() {
    this.credentialsForm = this.formBuilder.group({
      key: ['', Validators.required],
      token: ['', Validators.required]
    });
  }
}
