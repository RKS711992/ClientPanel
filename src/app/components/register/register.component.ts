import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: NgFlashMessageService
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    this.authService.register(this.email, this.password).then(value => {
      this.flashMessage.showFlashMessage(
        {
          messages: ["You are now registered and logged in!!!"],
          dismissible: true,
          timeout: 1500,
          type: 'success'
        });
        this.router.navigate(['/']);
    }).catch(err => {
      this.flashMessage.showFlashMessage(
        {
          messages: [err.message],
          dismissible: true,
          timeout: 1500,
          type: 'danger'
        });
        //this.router.navigate(['/']);
    });
  }

}
