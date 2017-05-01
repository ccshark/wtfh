import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { GroupLobby } from '../pages/group-lobby/group-lobby';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { Todos } from '../providers/todos';
import { Party } from '../providers/party';
import { Auth } from '../providers/auth';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    GroupLobby,
    LoginPage,
    SignupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    GroupLobby,
    LoginPage,
    SignupPage
  ],
  providers: [
    Storage,
    Todos,
    Party,
    Auth,
    Geolocation
  ]
})
export class AppModule {}
