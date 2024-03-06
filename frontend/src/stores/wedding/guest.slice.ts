import { StateCreator } from 'zustand';

export interface GuestSlice{
  guestQuantity: number;
  
  setGuestQuantity: (quantity: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
  guestQuantity: 0,

  setGuestQuantity: (quantity: number) => set({ guestQuantity: quantity > 0 ? quantity : 0 })
})