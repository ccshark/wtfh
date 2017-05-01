import { Component, ViewChild, ElementRef} from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Todos } from '../../providers/todos';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  todos: any;
  loading: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController,
              public todoService: Todos,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public authService: Auth,
              public loadingCtrl: LoadingController,
              public geolocation: Geolocation) {
  }

  ionViewDidLoad(){
    this.loadMap();
    /*this.todoService.getTodos().then((data) => {
          //this.todos = data;
          this.loadMap();
    }, (err) => {
        console.log("not allowed");
    }); */

  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });

  }

  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  addTodo(){

    let prompt = this.alertCtrl.create({
      title: 'Add Todo',
      message: 'Describe your todo below:',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: todo => {

                if(todo){

                    this.showLoader();

                    this.todoService.createTodo(todo).then((result) => {
                        this.loading.dismiss();
                        this.todos = result;
                        console.log("todo created");
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

  deleteTodo(todo){

    this.showLoader();

    //Remove from database
    this.todoService.deleteTodo(todo._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
        let index = this.todos.indexOf(todo);

        if(index > -1){
            this.todos.splice(index, 1);
        }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
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
