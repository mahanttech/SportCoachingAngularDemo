import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { TestlistComponent } from './testlist/testlist.component';
import { MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSortModule, MatStepperModule, MatTableModule, MatTreeModule, MatDatepickerModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { TestdetaillistComponent } from './testdetaillist/testdetaillist.component';
import { DeletepopuptestComponent } from './deletepopuptest/deletepopuptest.component';
import { DeleteathletepopupComponent } from './deleteathletepopup/deleteathletepopup.component';


const routes = [
    {
        path     : 'SportTest/TestListComponent',
        component: TestlistComponent
    },
    {
      path     : 'SportTest/TestDetailListComponent',
      component: TestdetaillistComponent
  }
];

@NgModule({
    declarations: [
        TestlistComponent,
        TestdetaillistComponent,
        DeletepopuptestComponent,
        DeleteathletepopupComponent

    ],
        
        entryComponents: [DeletepopuptestComponent,DeleteathletepopupComponent],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,
        FuseSharedModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTreeModule,
        FuseSharedModule,
              MatRadioModule,
              MatButtonModule,
              MatFormFieldModule,
              MatIconModule,
              MatInputModule,
              MatSelectModule,
              MatStepperModule,
            //  NgxDatatableModule,
              MatCheckboxModule,
              MatPaginatorModule,
              MatSortModule,       
              FuseSharedModule,
              MatTableModule,
              MatDialogModule,
              MatListModule,
              MatAutocompleteModule,
              MatChipsModule,
            //   TreeTableModule,
              MatTreeModule,
            //  CommonModul,
              CdkTableModule,
              MatDatepickerModule





    ],
    exports     : [
        TestlistComponent,
        TestdetaillistComponent
    ]
})

export class SportTestModule
{
}
