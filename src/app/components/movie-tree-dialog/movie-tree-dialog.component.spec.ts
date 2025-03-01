import { TestBed } from '@angular/core/testing';
import { MovieTreeDialogComponent } from './movie-tree-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('MovieTreeDialogComponent', () => {
  let component: MovieTreeDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTreeDialogComponent], 
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
        { provide: MatDialogRef, useValue: { close: () => {} } } 
      ]
    }).compileComponents();

    component = TestBed.createComponent(MovieTreeDialogComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog', () =>{
    const closeSpy = spyOn(component.dialog, 'closeAll');
    component.closeDialog();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should get a random quote', () => {
    component.getRandomQuote();
    expect(component.randomQuote).toBeDefined();
  });
});
