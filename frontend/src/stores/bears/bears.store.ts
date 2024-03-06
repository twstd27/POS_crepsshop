import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Bear{
  id:number;
  name:string;
}

interface BearStore {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears:Bear[];

  totalBears: () => number;

  increaseBlackBears: (by:number) => void;
  increasePolarBears: (by:number) => void;
  increasePandaBears: (by:number) => void;

  addBears: () => void;
  clearBears: () => void;
}

export const useBearsStore = create<BearStore>()(
  persist(
    (set, get) => ({
    blackBears: 10,
    polarBears: 5,
    pandaBears: 1,
    bears: [{id:1, name:'Oso #1'}, {id:2, name:'Oso #2'}, {id:3, name:'Oso #3'}],
    totalBears() {
      return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
    },
    increaseBlackBears: (by:number) => set((state) => ({ blackBears: state.blackBears + by })),
    increasePolarBears: (by:number) => set((state) => ({ polarBears: state.polarBears + by })),
    increasePandaBears: (by:number) => set((state) => ({ pandaBears: state.pandaBears + by })),
    addBears: () => set(state => ({
      bears: [...state.bears, {id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}`}]
    })),
    clearBears: () => set({bears: []})
    })
  , {name: 'bears-store'}
  )
);