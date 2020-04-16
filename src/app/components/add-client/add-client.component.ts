import { Component, OnInit , ViewChild} from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';

import { Client } from '../../models/Client'
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client={
    firstName :"",
    lastName : "",
    email : "",
    phone : "",
    balance : 0
  };
  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm',{static: false}) form: any;

  constructor(private flashMessage: NgFlashMessageService,
              private clientService: ClientService,
              private router: Router,
              private settingsService : SettingsService
        ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value,valid}:{value: Client , valid : boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    } 
    if(!valid){
      //Show Error
      this.flashMessage.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Please Fill Out The Form Correctly!!!"], 
        // Whether the flash can be dismissed by the user defaults to false
        dismissible: true, 
        // Time after which the flash disappears defaults to 2000ms
        timeout: false,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'
      });
    }else{
      //Add New Client
      this.clientService.newClient(value);
      //Show message
      this.flashMessage.showFlashMessage({        
        messages: ["New Client added successfully!!!"], 
        dismissible: true,
        timeout: 3000,        
        type: 'success'
      });
      //Redirect to dashboard
      this.router.navigate(['/']);
    }
    console.log(value,valid);
  }

}
