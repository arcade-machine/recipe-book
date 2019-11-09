import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DropdownDirective } from './dropdown.directive';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        DropdownDirective,
        LoaderComponent,
        AlertComponent
    ],
    exports: [
        DropdownDirective,
        LoaderComponent,
        AlertComponent,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class SharedModule { }
