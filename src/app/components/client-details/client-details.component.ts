import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute,Params} from '@angular/router';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {  
  id: string;
  client : Client;
  hasBalance : boolean = false;
  showBalanceUpdateInput: boolean= false;

  constructor(
    private clientService : ClientService,
    private router : Router,
    private route: ActivatedRoute,
    private flashMessage: NgFlashMessageService
  ) { }

  ngOnInit() {
    //Get Id from URL
    this.id = this.route.snapshot.params['id'];
    //Get Client
    this.clientService.getClient(this.id).subscribe(client=>{
      if(client!=null && client.balance>0){
        this.hasBalance = true;
      }
      this.client = client;
      console.log(this.client);
    });
  }

  updateBalance(){
    this.clientService.updateClient(this.client);
    this.flashMessage.showFlashMessage({        
      messages: ["Balance Updated successfully!!!"], 
      dismissible: true,
      timeout: 1500,        
      type: 'success'
    });    
  }

  onDeleteClick(){
    if(confirm("Are you sure you want to delete????")){
      this.clientService.deleteClient(this.client);
      this.flashMessage.showFlashMessage({        
        messages: ["Client Removed!!!"], 
        dismissible: true,
        timeout: 1500,        
        type: 'success'
      }); 
      this.router.navigate(['/']);
    }
  }

}
