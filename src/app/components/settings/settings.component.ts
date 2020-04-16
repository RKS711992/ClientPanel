import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/Settings';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  constructor(
    private router : Router,    
    private flashMessage: NgFlashMessageService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit(){
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.showFlashMessage(
      {
        messages: ["Settings Saved!!!"],
        dismissible: true,
        timeout: 4000,
        type: 'alert'
      });
      
  }

}
