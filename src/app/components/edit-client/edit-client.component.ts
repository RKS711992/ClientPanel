import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Client } from '../../models/Client';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = { firstName: "", lastName: "", email: "", phone: "", balance: 0 };
  disableBalanceOnEdit: boolean ;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: NgFlashMessageService,
    private settingsService : SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    //Get Id from URL
    this.id = this.route.snapshot.params['id'];
    //Get Client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.client);
    });
  }

  onSubmit({value,valid}:{value: Client, valid: boolean}){
    if(!valid){
      this.flashMessage.showFlashMessage({        
        messages: ["Please fill the form correctly!!!"], 
        dismissible: true,
        timeout: 1500,        
        type: 'danger'
      });
    }else{
      //Add Id to client
      value.id = this.id;
      //Update the client
      this.clientService.updateClient(value);
      this.flashMessage.showFlashMessage({        
        messages: ["Client Updated Successfully!!!"], 
        dismissible: true,
        timeout: 1500,        
        type: 'success'
      });
      this.router.navigate(['/client/'+this.id]);
    }
  }

}
