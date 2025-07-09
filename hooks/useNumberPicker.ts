import { create } from "zustand";

export default create<{
  selectionLimit: number;
  numberArrayLength: number;
  selectedNumbers: Set<number>;
  isSelectionLimitReached: boolean;

  clearSelectedNumbers: () => void;
  setSelectionLimit: (selectionLimit: number) => void;
  setSelectedNumber: (selectedNumber: number) => void;
  unsetSelectedNumber: (selectedNumber: number) => void;
  setNumberArrayLength: (setNumberArrayLength: number) => void;
}>((set) => ({
  selectionLimit: 5,
  numberArrayLength: 42,
  isSelectionLimitReached: false,
  selectedNumbers: new Set<number>(),

  setSelectionLimit: (selectionLimit) => {
    set({
      selectionLimit,
      selectedNumbers: new Set(),
      isSelectionLimitReached: false,
    });
  },
  clearSelectedNumbers: () => {
    set({ selectedNumbers: new Set(), isSelectionLimitReached: false });
  },
  setNumberArrayLength: (numberArrayLength) => set({ numberArrayLength }),
  setSelectedNumber: (selectedNumber) => {
    set(({ selectionLimit, selectedNumbers, isSelectionLimitReached }) => {
      // check if another number can be added
      if (isSelectionLimitReached) return { selectedNumbers };

      const next = new Set(selectedNumbers);
      next.add(selectedNumber);
      return {
        selectedNumbers: next,
        isSelectionLimitReached: next.size === selectionLimit,
      };
    });
  },
  unsetSelectedNumber: (selectedNumber) => {
    set(({ selectionLimit, selectedNumbers }) => {
      const next = new Set(selectedNumbers);
      next.delete(selectedNumber);
      return {
        selectedNumbers: next,
        isSelectionLimitReached: next.size === selectionLimit,
      };
    });
  },
}));
