import { createAction, createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../store";

type CounterState = {
  counter: number;
};

type CountersState = Record<CounterId, CounterState | undefined>;

export type CounterId = string;

export const IncrementAction = createAction<{ counterId: CounterId }>(
  "counters/increment"
);

export const DecrementAction = createAction<{ counterId: CounterId }>(
  "counters/decrement"
);

const InitialCounterState: CounterState = { counter: 0 };
const initialCountersState: CountersState = {};

export const countersReducer = createReducer(
  initialCountersState,
  (builder) => {
    builder.addCase(IncrementAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) state[counterId] = InitialCounterState;

      state[counterId].counter++;
    });
    builder.addCase(DecrementAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) state[counterId] = InitialCounterState;

      state[counterId].counter--;
    });
  }
);

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
