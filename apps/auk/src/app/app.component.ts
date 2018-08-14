import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'auk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auk';

  public model;

  public error = {
    test: 'test error',
    a: {
      b: '2 level'
    },
    c: {
      d: {
        e: '3 level'
      }
    }
  };

  public test = new FormControl(null, [Validators.required]);
}
