import { Component, ViewChild, ElementRef} from "@angular/core";
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Todos } from '../../providers/todos';
import { Auth } from '../../providers/auth';
import * as io from 'socket.io-client';


@Component({
  selector: 'group-lobby',
  templateUrl: 'group-lobby.html'
})
export class GroupLobby {

  todos: any;
  loading: any;
  socket:any;
  room:any;
  roomName:String;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
              public todoService: Todos,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public authService: Auth,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.socket = io('http://localhost:8080').connect();
    this.room = this.navParams.get('room');
    this.roomName = this.room.name;
    console.log(this.room);


    this.socket.emit('join', this.room._id);


    this.socket.on("new-user", function(data) {
      console.log(data.message);
    });

    this.socket.on('message', function(data) {
      console.log('Incoming message:', data);
    });
  }

  send(msg) {
    /*  if(msg != ''){
     this.socket.emit('message', msg);
     }
     this.chat_input = ''; */
  }


  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
