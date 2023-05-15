import {Component} from '@angular/core';
import {GameService} from "../service/game.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent {
  loading = true;
  name = new FormControl()
  isAdmin = false;

  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((value: any) => {
      console.log(value)
      if (value.id) {
        this.gameService.joinGame(value.id).subscribe((value: any) => {
          console.log(value)
          if (value.isExpired) {
            this.router.navigate(['home'])
          } else {
            this.loading = false;
          }
        })
      }
    });
  }
}
