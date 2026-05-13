import { Routes } from '@angular/router';
import { AddGameComponent } from './add-game/add-game.component';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './player/player.component';

export const routes: Routes = [
    { path: 'add-game', component: AddGameComponent },
    { path: 'home', component: HomeComponent },
    {path: 'players', component: PlayersComponent},
    {path: 'players/:id', component: PlayerComponent}
];
