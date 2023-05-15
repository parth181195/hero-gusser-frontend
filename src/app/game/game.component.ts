import {Component} from '@angular/core';
import {GameService} from "../service/game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent {
  loading = true;


  constructor(private gameService: GameService, private route: ActivatedRoute) {
    this.route.params.subscribe((value: any) => {
      console.log(value)
      if (value.id) {
        this.gameService.joinGame(value.id).subscribe((value: any) => {
          console.log(value)
          this.loading = false;
        })
      }
    });
  }
}
