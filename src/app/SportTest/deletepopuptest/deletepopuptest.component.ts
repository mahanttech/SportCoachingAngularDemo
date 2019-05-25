import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { APICallsService } from 'app/Service/apiCalls';

@Component({
  selector: 'app-deletepopuptest',
  templateUrl: './deletepopuptest.component.html',
  styleUrls: ['./deletepopuptest.component.scss']
})
export class DeletepopuptestComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletepopuptestComponent>,
    private apiCallService:APICallsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  DeleteTest(){
       this.apiCallService.deleteTest(this.data.Id).subscribe(x=>{
       if(x==1){
       this.dialogRef.close();
       }
       else if(x==-1)
       {
       this.dialogRef.close();
       }
       });
        }

}
