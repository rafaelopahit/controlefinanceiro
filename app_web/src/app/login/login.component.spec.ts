import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AccessService } from '../services/access.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MainService } from '../services/main.service';
import { async, of } from 'rxjs';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AccessService;
  let httpController: HttpTestingController;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [IonicModule.forRoot()],
      providers: [Router, AccessService, provideHttpClient(),
        provideHttpClientTesting(),]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('realiza login', fakeAsync(() => {

    service = TestBed.inject(AccessService);
    router = TestBed.inject(Router);

    httpController = TestBed.inject(HttpTestingController)

    component.form.controls["email"].setValue("admin@gmail.com");
    component.form.controls["password"].setValue("adm@23");

    fixture.detectChanges();

    let spy = spyOn(service, 'login').and.returnValue(of(false));

    component.login();

    tick();

    fixture.detectChanges();

    expect(service.login).toHaveBeenCalled();

  }));
});
