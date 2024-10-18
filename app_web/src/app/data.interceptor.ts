import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http'
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular'
import { Observable, throwError } from 'rxjs'
import {
  catchError,
  delay,
  finalize,
  map,
  retry,
  retryWhen,
  tap,
} from 'rxjs/operators'
import { MainService } from './services/main.service'

export class ErrorIntercept implements HttpInterceptor {
  mensagem: any
  constructor(

    private navCtrl: NavController,
    public loading: LoadingController,

    private toast: ToastController,
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    let retries = 1



    const modifiedReq = request.clone({
      params: request.params,
      headers: request.headers.set('Authorization', `Bearer ` + (localStorage.getItem("user") != null ? JSON.parse(<string>localStorage.getItem("user")).api_token : ''))

    })

    return next.handle(modifiedReq).pipe(
      retryWhen((err) => {
        return err.pipe(
          delay(5000),
          tap((error) => {
            this.showRetryLoading(retries)
            if (retries > 2 && error.status == 401) {
              this.navCtrl.navigateRoot(['/login'])
            }
          }),
        )
      }),
      map((error) => {
        if ((retries += 1) === 4) {
          throw error
        }
        return error
      }),
      finalize(() => {

      }),
    )
  }
  async showRetryLoading(retries: number) {
    const toast = await this.toast.create({
      message:
        'Houve um erro inesperado tentando novamente ... ' + retries + ' / 3',
      duration: 4000,
    })
    toast.present()
  }
}
