import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should initial empty title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('');
    const compiled = fixture.debugElement.nativeElement;
  });

  it(`should update title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelector('a-popup-menu').trigger.dispatchEvent(new Event('mousedown'));
    compiled.querySelectorAll('a-menu-item')[3].dispatchEvent(new Event('mouseup'));
    expect(app.title).toEqual('Another option');
    compiled.querySelectorAll('a-menu-item')[2].dispatchEvent(new Event('mouseup'));
    expect(app.title).toEqual('Option 2');
  });
});
