import { Component, OnInit, ViewChild } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IClient, MstTestModel, SystemUsersModel } from 'api/apiclient';
import { APICallsService } from 'app/Service/apiCalls';
import { Router } from '@angular/router';
import { LocalStorageService } from 'app/Service/localStorageService';

@Component({
  selector: 'app-testlist',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.scss']
})
export class TestlistComponent implements OnInit {

  NewTestform: FormGroup;
  NewTestformErrors: any;
  IsCreateTest:boolean=false;
  testList;
  mstTestModel:MstTestModel;
  TestTypeModel;
  Date;
  systemUsersModel:SystemUsersModel;


  TestType= [  { id: 1,type: 'Cooper Test'},
  { id: 2,type: 'Sprint Test'}
];

//For Test Datatable
displayedColumns = ['Date','NumberOfparticipants','TetsType'];
dataSource:MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(
    
    private fuseConfig: FuseConfigService,
    private apiCallService:APICallsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notif: NotificationsService,
    private localStorageService:LocalStorageService,

  
  ) { 

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
     

  this.dataSource = new MatTableDataSource();
  // Service From Errors
  this.NewTestformErrors={

    TestType:{},
    Date:{}

  };

  this.mstTestModel=new  MstTestModel();
  this.systemUsersModel=new SystemUsersModel();

  }

  ngOnInit() {
   this.systemUsersModel=  this.localStorageService.GetValueFromLocalStorage();
   if(this.systemUsersModel.token!=null){
    this.bindtestlistdatatable();
    this.NewTestform=this.formBuilder.group({
      TestType:['',Validators.required],
       Date:['',Validators.required]
    });

    this.NewTestform.valueChanges.subscribe(()=>{
      this.onFormValuesChanged();
    });
  }
  else{

    this.router.navigate(['auth/login']);

  }


  }
  onFormValuesChanged()
  {
      for ( const field in this.NewTestformErrors )
      {
          if ( !this.NewTestformErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.NewTestformErrors[field] = {};

          // Get the control
          const control = this.NewTestform.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.NewTestformErrors[field] = control.errors;
          }
      }
  }

  toggle() {
   
    this.IsCreateTest = !this.IsCreateTest;
    this.NewTestform.reset();
  }

  Clear()
  {
    this.IsCreateTest=false;
    this.NewTestform.reset();
  }

  TestInsert()
  {
    this.mstTestModel.testType=this.TestTypeModel.type;
    this.mstTestModel.testDate=this.Date;
    this.apiCallService.insertUpdateTest(this.mstTestModel).subscribe(x=>{
        if(x==1)
        {
         
          this.notif.success("Message","Test inserted successfully...",{
            timeOut:6000,
          });
          this.bindtestlistdatatable(); 
          this.Clear();
        }
    });
    this.Clear();
   this.bindtestlistdatatable();
  }


//bind test list on page load
 bindtestlistdatatable(){

      this.apiCallService.getTestList().subscribe(x=>{
        this.testList = Object.keys(x).map(function(personNamedIndex){
              let person = x[personNamedIndex];
              return person;
    })
    this.dataSource = new MatTableDataSource(this.testList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
}


//Go To Test Detail page
GoToDetailPage(dataObject){
  let testIds=dataObject.id;
  let testName=dataObject.testType;
  let testDate=dataObject.testDate;
  this.router.navigate(['SportTest/TestDetailListComponent',{testIds,testName,testDate}],{skipLocationChange:true});
}

applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}




}
