import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReverseTrackingBoxValidatePage } from './reverse-tracking-box-validate.page';

describe('ReceptionBoxEditPage', () => {
  let component: ReverseTrackingBoxValidatePage;
  let fixture: ComponentFixture<ReverseTrackingBoxValidatePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReverseTrackingBoxValidatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReverseTrackingBoxValidatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
