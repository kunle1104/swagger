import { TestBed, async } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { SwaggerService } from './swagger.service';

TestBed.configureTestingModule({
  imports: [
    HttpClientTestingModule
  ]});
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  /* it(`should have as title 'swagger'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('swagger');
  }); */

  /*it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to swagger!');
  }); */
  it('should fetch data successfully if called asynchronously', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const swaggerService = fixture.debugElement.injector.get(SwaggerService);
    const spy = spyOn(swaggerService, 'getCars')
      .and.returnValue(Promise.resolve('CarShow'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.data).toBe('CarShow');
    });
  }));
});
