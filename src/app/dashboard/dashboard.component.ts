import { Component, OnInit } from '@angular/core';
import { Rooms } from 'app/interfaces/rooms';
import { AppService } from 'app/app.service';
import { environment } from 'environments/environment';
import { USER_TYPE } from 'app/interfaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private _rooms: Rooms[];
  public rooms: Rooms[];
  public is_admin: boolean;
  public filter: string;

  constructor(private api: AppService) { }

  ngOnInit() {
    this.api.isUserType(USER_TYPE.LAB_ADMIN).then(isAdmin => {
      this.is_admin = isAdmin;
      if (isAdmin) {
        const user = this.api.user;
        this.api.getRooms("salas/admin/" + user.id)
          .subscribe(rooms => {
            this._rooms = rooms;
            this.rooms = this._rooms;
            this.loadImages();
          });
      } else {
        this.api.getRooms("salas")
          .subscribe(rooms => {
            this._rooms = rooms;
            this.rooms = this._rooms;
            this.loadImages();
          });
      }
    }
    );
  }

  applyFilter() {
    const filter = this.filter.trim().toLowerCase();
    let newRooms = this._rooms.filter(room => 
      room.description.toLowerCase().includes(filter)
      || room.name.toLowerCase().includes(filter)
      || room.owner_id.toLowerCase().includes(filter)
      || room.manager_id.toLowerCase().includes(filter)
      || room.id.includes(filter));
    this.rooms = newRooms;
  }

  loadImages() {
    this.rooms.forEach(room => {
      room.path_image = environment.api_url + "salas/" + room.id + "/picture";
    });
  }
}
