import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe((auth) =>{
      if(auth){
        this.router.navigate(['/']);
      }
    });    
  }
  onSubmit() {
    this.authService.login(this.email, this.password).then(value => {
      this.flashMessage.showFlashMessage(
        {
          messages: ["Successfull Login!!!"],
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
