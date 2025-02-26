import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTreeNodeComponent } from './movie-tree-node.component';

describe('MovieTreeNodeComponent', () => {
  let component: MovieTreeNodeComponent;
  let fixture: ComponentFixture<MovieTreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTreeNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
