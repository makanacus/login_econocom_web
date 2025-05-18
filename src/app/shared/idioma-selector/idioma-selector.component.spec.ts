import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomaSelectorComponent } from './idioma-selector.component';

describe('IdiomaSelectorComponent', () => {
  let component: IdiomaSelectorComponent;
  let fixture: ComponentFixture<IdiomaSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdiomaSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdiomaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
