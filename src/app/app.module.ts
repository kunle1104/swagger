import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
// import { SwaggerService } from './swagger.service';
import { ConnectComponent } from './connect/connect.component';
import { ErrorInterceptor } from './error-interceptor';
import { GroupByPipe } from './group-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    GroupByPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
