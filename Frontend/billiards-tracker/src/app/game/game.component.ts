import { Component, Input, EventEmitter } from '@angular/core'

import { IMappedGame } from '../models/IMappedGame';
@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
    @Input() game!: IMappedGame;

}
