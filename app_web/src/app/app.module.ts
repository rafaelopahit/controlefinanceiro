import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, LoadingController, NavController, ToastController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { LoginComponent } from './login/login.component';
import { ErrorIntercept } from './data.interceptor';
import { MainService } from './services/main.service';

import { Component } from '@angular/core';
import { MaskitoDirective } from '@maskito/angular';

@NgModule({
  declarations: [AppComponent, MenuComponent, DashboardComponent, LancamentosComponent, RelatorioComponent, LoginComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, HttpClientModule, MaskitoDirective],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntercept,
    multi: true,
    deps: [NavController, LoadingController, ToastController, Router]
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
