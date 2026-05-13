import { Component, Input } from '@angular/core';
import { IPlayer } from '../models/IPlayer';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPlayerInfo } from '../models/IPlayerInfo';


@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  @Input() player!: IPlayer;

  public playerId: number = 0;

  public playerInfo: IPlayerInfo = {id: 0, name: "", gamesPlayed: 0, wins: 0, losses: 0};

  constructor(private _httpClient: HttpClient, public route: ActivatedRoute) {

    this.route.paramMap.subscribe({
      next: (params) => {
        this.playerId = Number(params.get("id"));
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        console.log("Done....");
      }
    });

  }

  ngOnInit() {
    if(this.playerId != 0) {
      this.getPlayerInfo(this.playerId);
    }
  }

    getPlayerInfo(id: number) {
         const options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Accept' : "application/json"
      })
    };

    this._httpClient.get<IPlayerInfo>(`http://localhost:3000/players/${id}/info`, options)
      .subscribe({
        next: (data: IPlayerInfo) => {
          console.log(data);
          this.playerInfo = data;
        },
        error: (e: any) => {
          console.error(`Error occurred: ${e}`);
        }
      });

  }



}
