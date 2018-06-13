import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TinymceModule } from 'angular2-tinymce';
//https://github.com/kekeh/mydatepicker
import {MyDatePickerModule} from 'mydatepicker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SkillsComponent } from './skills/skills.component';
import { ProfileComponent } from './profile/profile.component';
import { DisplayDatePipe } from './date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GetStartedComponent,
    PageNotFoundComponent,
    ExperienceComponent,
    EducationComponent,
    PortfolioComponent,
    SkillsComponent,
    ProfileComponent,
    DisplayDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    TinymceModule.withConfig({
      menubar: false,
      'auto_focus':false
    }),
    MyDatePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
