import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {GameService} from "../service/game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  nick = new FormControl('test', [Validators.required])
  gameLength = new FormControl('10', [Validators.required])
  loading = false;

  constructor(private gameService: GameService, private router: Router) {
  }

  createGame() {
    if (!this.loading) {
      this.loading = true;
      this.gameService.createGame(this.nick.value, parseInt(this.gameLength.value, 0)).subscribe((value: any) => {
        this.router.navigate(['game/' + value])
      })
    }
  }
}
