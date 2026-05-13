import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPlayer } from '../models/IPlayer';
import { IGame } from '../models/IGame';


@Component({
  selector: 'app-add-game',
  imports: [FormsModule, RouterOutlet, RouterModule],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.scss'
})
export class AddGameComponent {
    constructor(public router: Router, private _httpClient: HttpClient) {}

    saveUnsuccessful: boolean = false;
    //I want to come back and make these drop downs from all available players, instead of just text inputs 

    player1: { id: number, name: string } = { id: 0, name: "" };
    player2: { id: number, name: string } = { id: 0, name: "" };
    winner: { id: number, name: string } = { id: 0, name: "" };

    players : IPlayer[] = [];

    onFormSubmit(ngForm: NgForm) {
        this.saveUnsuccessful = false;

        if (!ngForm.valid){
          this.saveUnsuccessful = true;
          return;
        }

        console.log(ngForm);

              const options = {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                }),
              };

              const data = {
                player1Id: this.player1.id,
                player2Id: this.player2.id,
                winnerId: this.winner.id,
              } as IGame;

          this._httpClient.post<IGame>("http://localhost:3000/games", data, options)
          .subscribe({
            next: (data: IGame) => {
              console.log(data);
              ngForm.reset();
              this.player1 = { id: 0, name: "" };
              this.player2 = { id: 0, name: "" };
              this.winner = { id: 0, name: "" };
            },
            error: (e: any) => {
              console.error(`Error occurred: ${e}`);
            }
          });
      }

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
