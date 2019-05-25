import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeletepopuptestComponent } from '../deletepopuptest/deletepopuptest.component';
import { DeleteathletepopupComponent } from '../deleteathletepopup/deleteathletepopup.component';
import { APICallsService } from 'app/Service/apiCalls';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { TestAthleteMappingModel } from 'api/apiclient';

@Component({
  selector: 'app-testdetaillist',
  templateUrl: './testdetaillist.component.html',
  styleUrls: ['./testdetaillist.component.scss']
})
export class TestdetaillistComponent implements OnInit {
  NewAthleteform: FormGroup;
  NewAthleteformErrors: any;
  IsCreateAthlete:boolean=false;
  testAthleteMappingModel:TestAthleteMappingModel;

//For Test Datatable
displayedColumns = ['Ranking','Distance','FitnessRating','Deleteathlete'];
dataSource:MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
testIds;
testName;
testDate;
testDetailList;
athleteModel;
athleteList;
DistanceModel;
testDetailIdModel=0;
//For Service Datatable

  constructor( private fuseConfig: FuseConfigService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private apiCallService:APICallsService,
    private activatedRoute:ActivatedRoute,
    private notif: NotificationsService,
    private router: Router,

    ) { 

    
    this.dataSource = new MatTableDataSource();
    this.testAthleteMappingModel=new TestAthleteMappingModel()
    // Configure the layout
    this.fuseConfig.config = {
      layout: {
          navbar   : {
              hidden: true
          },
          toolbar  : {
              hidden: false
          },
          footer   : {
              hidden: false
          },
          sidepanel: {
              hidden: true
          }
      }
  };

  this.NewAthleteformErrors={

    athlete:{},
    Distance:{}

  };
  }

  ngOnInit() {
    this.testIds =this.activatedRoute.snapshot.paramMap.get('testIds');
    this.testDate =this.activatedRoute.snapshot.paramMap.get('testDate');
    this.testName =this.activatedRoute.snapshot.paramMap.get('testName');
    this.bindtestdetaillistdatatable();
    this.bindAthleteDdl();
    this.NewAthleteform=this.formBuilder.group({
      athlete:['',Validators.required],
      Distance:['',Validators.required]
    });

    this.NewAthleteform.valueChanges.subscribe(()=>{
      this.onFormValuesChanged();
    });
  }



  onFormValuesChanged()
  {
      for ( const field in this.NewAthleteformErrors )
      {
          if ( !this.NewAthleteformErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.NewAthleteformErrors[field] = {};

          // Get the control
          const control = this.NewAthleteform.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.NewAthleteformErrors[field] = control.errors;
          }
      }
  }

  //Bind athlete dropDown
  bindAthleteDdl(){

    this.apiCallService.getAthleteList().subscribe(x=>{
      this.athleteList = Object.keys(x).map(function(personNamedIndex){
            let person = x[personNamedIndex];
             return person;
  })
  });
  }


//bind testDetail by id
bindtestdetaillistdatatable(){
    this.apiCallService.getTestDetailsWithId(+this.testIds).subscribe(x=>{
      this.testDetailList = Object.keys(x).map(function(personNamedIndex){
            let person = x[personNamedIndex];
             return person;
  })
  this.dataSource = new MatTableDataSource(this.testDetailList);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  });
  
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  
  toggle() {
  
    this.IsCreateAthlete = !this.IsCreateAthlete;
    this.NewAthleteform.reset();
  }

  Clear()
  {
    this.IsCreateAthlete=false;
    this.testDetailIdModel=0;
    this.NewAthleteform.reset();
  }

  CheckFitnessRating(Distance){
    if (Distance<=1000)
    {
        return "Below Average";
    }
   else if (Distance > 1000 && Distance <= 2000)
    {
        return "Average";
    }
   else if (Distance > 2000 && Distance <= 3500)
    {
        return "Good";
    }
   else if (Distance > 3500)
    {
        return "Very Good";
    }

  }

  EditAthlete(dataObj){
    this.IsCreateAthlete = true; 
this.athleteModel=dataObj.athleteId;
this.DistanceModel=dataObj.distance;
this.testDetailIdModel=dataObj.id;

  }

  AthleteInsert()
  {
    this.testAthleteMappingModel.athleteId=this.athleteModel;
    this.testAthleteMappingModel.distance=this.DistanceModel;
    this.testAthleteMappingModel.testId=this.testIds;
    this.testAthleteMappingModel.id=this.testDetailIdModel;
    this.testAthleteMappingModel.fitnessRating=this.CheckFitnessRating(this.DistanceModel);

    this.apiCallService.insertUpdateAthlete(this.testAthleteMappingModel).subscribe(x=>{
        if(x==1)
        {
         
          this.notif.success("Message","Athlete inserted successfully...",{
            timeOut:6000,
          });
          this.bindtestdetaillistdatatable(); 
          this.Clear();
        }
    });
  }

  DeleteDialogBoxForAthlete(dataObj)
{
  let dialogRef = this.dialog.open(DeleteathletepopupComponent, {
    width: 'auto',
    data: {Id:dataObj.id,AthleteName:dataObj.athleteName}
  });
 
 dialogRef.afterClosed().subscribe(result => {
   this.notif.success("Athlete delete succesfully..")
    this.bindtestdetaillistdatatable();
  });
}

back(){
  this.router.navigate(['SportTest/TestListComponent'],{skipLocationChange:true});
}

DeleteTest()
{
  let dialogRef = this.dialog.open(DeletepopuptestComponent, {
    width: 'auto',
     data: {Id:this.testIds}
  });
 
 dialogRef.afterClosed().subscribe(result => {
  this.back();
  });
}


}
