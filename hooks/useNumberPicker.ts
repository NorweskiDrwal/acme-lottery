import { create } from "zustand";

export default create<{
  selectionSize: number;
  selectionLimit: number;
  selectedNumbers: Set<number>;
  isSelectionLimitReached: boolean;

  clearSelectedNumbers: () => void;
  setSelectionSize: (selectionSize: number) => void;
  setSelectedNumber: (selectedNumber: number) => void;
  setSelectionLimit: (selectionLimit: number) => void;
  unsetSelectedNumber: (selectedNumber: number) => void;
}>((set) => ({
  selectionSize: 42,
  selectionLimit: 5,
  isSelectionLimitReached: false,
  selectedNumbers: new Set<number>(),

  setSelectionSize: (selectionSize) => set({ selectionSize }),
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
  setSelectedNumber: (selectedNumber) => {
    set(({ selectionLimit, selectedNumbers, isSelectionLimitReached }) => {
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
