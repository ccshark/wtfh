import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Todos } from '../../providers/todos';
import { Party } from '../../providers/party';
import { GroupLobby } from '../group-lobby/group-lobby';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';


@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;
  loading: any;
  parties:any;

  constructor(public navCtrl: NavController,
              public todoService: Todos,
              public partyService: Party,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public authService: Auth,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad(){
    //this.loadMap();
    this.partyService.getParties().then((data) => {
          this.parties = data;
    }, (err) => {
        console.log("not allowed");
    });
  }

  createParty(){
    let prompt = this.alertCtrl.create({
      title: 'Create new party',
      message: 'Set name and password for the party',
      inputs: [
        {
          name: 'name',
          placeholder: 'Party Name'
        },
        {
          name: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Create',
          handler: party => {

                if(party){

                    this.showLoader();

                    this.partyService.createParty(party).then((result) => {
                        this.loading.dismiss();
                        //TODO: connect to the party lobby
                        console.log(result)
                        this.navCtrl.push(GroupLobby, {room : result[0]})
                    }, (err) => {
                        this.loading.dismiss();
                        console.log("not allowed");
                    });

                }
          }
        }
      ]
    });

    prompt.present();

  }

  joinParty(party){
    let prompt = this.alertCtrl.create({
      title: 'Join ' + party.name,
      message: '',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Join',
          handler: party => {
            this.navCtrl.push(GroupLobby, {room : party})
            /*if(party){

              this.showLoader();

              this.partyService.joinParty(party).then((result) => {
                this.loading.dismiss();
                //TODO: connect to the party lobby
                console.log(result)
                this.navCtrl.push(GroupLobby, {room : result[0]})
              }, (err) => {
                this.loading.dismiss();
                console.log("not allowed");
              });

            } */
          }
        }
      ]
    });

    prompt.present();

  }


  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

  logout(){

    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);

  }

}
