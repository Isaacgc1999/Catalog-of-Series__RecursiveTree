import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTreeDialogComponent } from './movie-tree-dialog.component';

describe('MovieTreeDialogComponent', () => {
  let component: MovieTreeDialogComponent;
  let fixture: ComponentFixture<MovieTreeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTreeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTreeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
