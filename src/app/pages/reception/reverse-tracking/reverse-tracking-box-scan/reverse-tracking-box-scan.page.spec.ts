import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReverseTrackingBoxScanPage } from './reverse-tracking-box-scan.page';

describe('ReceptionBoxScanPage', () => {
  let component: ReverseTrackingBoxScanPage;
  let fixture: ComponentFixture<ReverseTrackingBoxScanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReverseTrackingBoxScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReverseTrackingBoxScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
