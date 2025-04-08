import { PLAYERS } from "./constants";
import { GAME_STATE_ACTIONS } from "./model/gameStateReducer";
import { BackLink } from "./ui/backLink";
import { GameInfo } from "./ui/gameInfo";
import { GameLayout } from "./ui/gameLayout";
import { GameTitle } from "./ui/gameTitle";
import { PlayerInfo } from "./ui/playerInfo";
import { GameCell } from "./ui/gameCell";
import { GameMoveInfo } from "./ui/gameMoveInfo";
import { GameOverModal } from "./ui/gameOverModal";
import { useCallback, useMemo, useReducer } from "react";
import { getNextMove } from "./model/getNextMove";
import { computeWinner } from "./model/computeWinner";
import { gameStateReducer, initGameState } from "./model/gameStateReducer";
import { computeWinnerSymbol } from "./model/computeWinnerSymbol";
import { computePlayerTimer } from "./model/computePlayerTimer";
import { useInterval } from "../lib/timers";

const PLAYERS_COUNT = 2;

export function Game() {
  const [gameState, dispatch] = useReducer(
    gameStateReducer,
    {
      playersCount: PLAYERS_COUNT,
      defaultTimer: 10000,
      currentMoveStart: Date.now(),
    },
    initGameState,
  );
  const { cells, currentMove } = gameState;

  useInterval(
    1000,
    !!gameState.currentMoveStart,
    useCallback(() => {
      dispatch({
        type: GAME_STATE_ACTIONS.TICK,
        date: Date.now(),
      });
    }, []),
  );

  const handleCellClick = useCallback((index) => {
    dispatch({
      type: GAME_STATE_ACTIONS.CELL_CLICK,
      index,
      now: Date.now(),
    });
  }, []);

  const winnerSequence = useMemo(() => computeWinner(gameState), [gameState]);
  const nextMove = getNextMove(gameState);
  const winnerSymbol = computeWinnerSymbol(gameState, {
    winnerSequence,
    nextMove,
  });

  const winnerPlayer = PLAYERS.find((player) => player.symbol === winnerSymbol);

  return (
    <>
      <GameLayout
        backLink={<BackLink />}
        title={<GameTitle />}
        gameInfo={
          <GameInfo
            isRatingGame
            playersCount={PLAYERS_COUNT}
            timeMode={"1 мин. на ход"}
          />
        }
        playersList={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => {
          const { timer, timerStartAt } = computePlayerTimer(
            gameState,
            player.symbol,
          );
          return (
            <PlayerInfo
              key={player.id}
              name={player.name}
              rating={player.rating}
              avatar={player.avatar}
              symbol={player.symbol}
              timer={timer}
              timerStartAt={timerStartAt}
              isRight={index % 2 === 1}
            />
          );
        })}
        gameMoveInfo={
          <GameMoveInfo currentMove={currentMove} nextMove={nextMove} />
        }
        gameCells={cells.map((cell, index) => (
          <GameCell
            key={index}
            index={index}
            isWinner={winnerSequence?.includes(index)}
            disabled={!!winnerSymbol}
            onClick={handleCellClick}
            symbol={cell}
          />
        ))}
      />
      <GameOverModal
        winnerName={winnerPlayer?.name}
        players={PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => (
          <PlayerInfo
            key={player.id}
            name={player.name}
            rating={player.rating}
            avatar={player.avatar}
            symbol={player.symbol}
            timer={gameState.timers[player.symbol]}
            isRight={index % 2 === 1}
          />
        ))}
      />
    </>
  );
}
