import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTreeComponent } from './movie-tree.component';

describe('MovieTreeComponent', () => {
  let component: MovieTreeComponent;
  let fixture: ComponentFixture<MovieTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
