import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcardComponent } from './detailcard.component';

describe('DetailcardComponent', () => {
  let component: DetailcardComponent;
  let fixture: ComponentFixture<DetailcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
