import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripFlowComponent } from './trip-flow/trip-flow.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';


@NgModule({
  declarations: [
    AppComponent,
    TripFlowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Angular Material modules
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxGraphModule,
    FlexLayoutModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxGraphModule,
    FlexLayoutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
