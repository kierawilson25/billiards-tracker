import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { IPlayer } from '../models/IPlayer';
import { PlayerComponent } from '../player/player.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-players',
  imports: [PlayerComponent, RouterOutlet, RouterModule, CommonModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
    constructor(public router: Router, private _httpClient: HttpClient) {}
    players: IPlayer[] = [];

    ngOnInit() {
    this.getPlayers();
  }

    getPlayers() {
         const options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Accept' : "application/json"
      })
    };

    this._httpClient.get<IPlayer[]>("http://localhost:3000/players", options)
      .subscribe({
        next: (data: IPlayer[]) => {
          console.log(data);
          this.players = data;
        },
        error: (e: any) => {
          console.error(`Error occurred: ${e}`);
        }
      });

  }

}
