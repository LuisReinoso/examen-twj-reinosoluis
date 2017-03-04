import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarbodegaComponent } from './listarbodega.component';

describe('ListarbodegaComponent', () => {
  let component: ListarbodegaComponent;
  let fixture: ComponentFixture<ListarbodegaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarbodegaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarbodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
