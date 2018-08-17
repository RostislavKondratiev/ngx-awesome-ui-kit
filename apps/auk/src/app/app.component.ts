import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'auk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'auk';

  public model;

  public error;

  public test = new FormControl(null, [Validators.required]);

  public ngOnInit() {
    setTimeout(() => {
        this.error = {
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
      }, 3000);
  }
}
