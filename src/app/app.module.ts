import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { DataService } from './core/services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
