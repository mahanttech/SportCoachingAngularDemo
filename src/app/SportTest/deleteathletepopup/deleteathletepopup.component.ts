import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { APICallsService } from 'app/Service/apiCalls';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-deleteathletepopup',
  templateUrl: './deleteathletepopup.component.html',
  styleUrls: ['./deleteathletepopup.component.scss']
})
export class DeleteathletepopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteathletepopupComponent>,
    private apiCallService:APICallsService,
    private notif: NotificationsService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  DeleteAthlete(){
    this.apiCallService.deleteAthlete(this.data.Id).subscribe(x=>{
    if(x==1){
    this.notif.success("Success","Record deleted successfully",{
      timeOut:6000,
    });
    this.dialogRef.close();
    }
  
    else if(x==-1)
    {
    this.dialogRef.close();
    this.notif.error("Error","something went wrong",{
      timeOut:6000,
    })
    }
    });
     }


}
