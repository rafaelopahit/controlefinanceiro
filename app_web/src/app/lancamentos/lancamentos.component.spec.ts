import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LancamentosComponent } from './lancamentos.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AccessService } from '../services/access.service';
import { LancamentosService } from '../services/lancamentos.service';
import { of } from 'rxjs';


describe('LancamentosComponent', () => {




  let component: LancamentosComponent;
  let fixture: ComponentFixture<LancamentosComponent>;
  let service: LancamentosService;
  let httpController: HttpTestingController;
  let router: Router;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LancamentosComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add data', fakeAsync(() => {

    service = TestBed.inject(LancamentosService);
    router = TestBed.inject(Router);

    httpController = TestBed.inject(HttpTestingController)

    fixture.detectChanges();

    let spy = spyOn(service, 'getData').and.returnValue(of([]));

    component.getData();

    tick();

    fixture.detectChanges();

    expect(service.getData).toHaveBeenCalled();

  }))
});
