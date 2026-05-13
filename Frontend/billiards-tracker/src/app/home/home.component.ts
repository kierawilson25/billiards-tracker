import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { GameComponent } from '../game/game.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPlayer } from '../models/IPlayer';
import { IGame } from '../models/IGame';
import { IMappedGame } from '../models/IMappedGame';


@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterModule, GameComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(public router: Router, private _httpClient: HttpClient) {}

  // need to add some logic here that will pull games & map the player ids to player names, but for now this is just some dummy data to make sure the game component is working correctly
  games: IGame[] = []
  players: IPlayer[] = []

  mappedGames: IMappedGame[] = [];

  ngOnInit() {
    this.getGames();
  }



  getGames() {
         const options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Accept' : "application/json"
      })
    };

    this._httpClient.get<IMappedGame[]>("http://localhost:3000/mapped-games", options)
      .subscribe({
        next: (data: IMappedGame[]) => {
          console.log(data);
          this.mappedGames= data;
        },
        error: (e: any) => {
          console.error(`Error occurred: ${e}`);
        }
      });

  }


}
