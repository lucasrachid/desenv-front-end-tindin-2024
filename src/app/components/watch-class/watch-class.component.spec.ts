import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchClassComponent } from './watch-class.component';

describe('WatchClassComponent', () => {
  let component: WatchClassComponent;
  let fixture: ComponentFixture<WatchClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WatchClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
