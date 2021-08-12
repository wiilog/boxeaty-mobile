import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReverseTrackingCratePage } from './reverse-tracking-crate.page';

describe('ReceptionCratePage', () => {
  let component: ReverseTrackingCratePage;
  let fixture: ComponentFixture<ReverseTrackingCratePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReverseTrackingCratePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReverseTrackingCratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
