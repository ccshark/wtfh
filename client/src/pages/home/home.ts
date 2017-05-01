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
    /*this.todoService.getTodos().then((data) => {
          //this.todos = data;
          this.loadMap();
    }, (err) => {
        console.log("not allowed");
    }); */

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
                        this.navCtrl.push(GroupLobby, {id : result[0]._id})
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
