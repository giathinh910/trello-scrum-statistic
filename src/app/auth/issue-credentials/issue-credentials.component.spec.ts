import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCredentialsComponent } from './issue-credentials.component';

describe('IssueCredentialsComponent', () => {
  let component: IssueCredentialsComponent;
  let fixture: ComponentFixture<IssueCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
