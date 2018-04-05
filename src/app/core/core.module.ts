import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppContentComponent } from './components/app-content/app-content.component';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppService } from './services/app.service';
import { UserService } from './services/user.service';
import { LogInService } from './services/log-in.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { baseURL } from './config/baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './config/restConfig';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  declarations: [AppHeaderComponent, AppContentComponent],
  exports: [AppHeaderComponent, AppContentComponent],
  providers: [
    AppService,
    ProcessHTTPMsgService,
    UserService,
    LogInService,
    { provide: 'BaseURL', 
      useValue: baseURL 
    }
  ]
})
export class CoreModule { }
