import { randomUUID } from "expo-crypto";
import { create } from "zustand";

import { sequence } from "@/utils";

export default create<{
  playsLimit: number;
  isPlaysLimitReached: boolean;
  plays: { id: string; numbers: number[] }[];

  removePlay: (id: string) => void;
  addPlay: (numbers: number[]) => void;
  setPlaysLimit: (playsLimit: number) => void;
}>((set) => ({
  plays: [],
  playsLimit: 3,
  isPlaysLimitReached: false,

  setPlaysLimit: (playsLimit) =>
    set({ playsLimit, isPlaysLimitReached: false }),

  removePlay: (id) => {
    set(({ plays, playsLimit }) => {
      const next = plays?.filter((play) => id !== play.id);
      return {
        plays: next,
        isPlaysLimitReached: next.length === playsLimit,
      };
    });
  },

  addPlay: (numbers) => {
    set(({ plays, playsLimit, isPlaysLimitReached }) => {
      // break if not within limit
      if (isPlaysLimitReached) return { plays };

      for (let play of plays) {
        // break if similar sequence of numbers exists
        if (sequence(numbers) === sequence(play.numbers)) return { plays };
      }

      const next = [...plays, { id: randomUUID(), numbers }];
      return {
        plays: next,
        isPlaysLimitReached: next.length === playsLimit,
      };
    });
  },
}));
