import {Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  socket: Socket;
  gameSub = new Subject();
  gameDetailsPageSub = new Subject();
  gamePingSub = new Subject();

  constructor() {
    this.setupSocketConnection()
  }

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');
    this.socket.on('ping', (val) => {
      console.log(val)
    })
  }

  createGame(nick: string, length: number) {
    this.socket.emit(ChatEvent.CREATEGAME, {nick, length}, (val) => {
      console.log(val)
      this.gameSub.next(val.gamePin)
      this.gameSub.complete();
    })
    return this.gameSub;
  }

  joinGame(pin) {
    this.socket.emit(ChatEvent.ENTERGAME, {pin}, (val) => {
      console.log(val)
      this.gameDetailsPageSub.next(val)
    })
    return this.gameDetailsPageSub;
  }
}

enum ChatEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  ENTERGAME = 'join_game',
  CREATEGAME = 'create_game',
  GUESSHERO = 'guess_hero',
}
