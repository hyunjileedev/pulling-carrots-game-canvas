'use strict';

import { GameBuilder } from './game.js';
import Msg from './msg.js';

const carrotGame = new GameBuilder()
  .withGameDuration(10)
  .withCarrotsCount(10)
  .withBugsCount(10)
  .build();

const gameFinishMsg = new Msg();

carrotGame.setFinishListener(gameFinishMsg.show);

gameFinishMsg.setReplayListener(() => {
  carrotGame.reset();
  carrotGame.start();
});

gameFinishMsg.setCancelListener(() => {
  carrotGame.reset();
});

carrotGame.setResetListener(gameFinishMsg.hide);
