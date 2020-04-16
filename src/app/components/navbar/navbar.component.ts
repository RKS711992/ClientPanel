import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Client } from '../../models/Client';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn : boolean;
  loggedInUser : string;
  showRegister: boolean;

  constructor(
    private authService : AuthService,
    private router : Router,    
    private flashMessage: NgFlashMessageService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe((auth) =>{
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false;        
      }
    });
    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }
  onLogOutClick(){
    this.authService.logout();
    this.flashMessage.showFlashMessage(
      {
        messages: ["Logout Successfull !!!"],
        dismissible: true,
        timeout: 4000,
        type: 'success'
      });
      this.router.navigate(['/login']);
  }

}
