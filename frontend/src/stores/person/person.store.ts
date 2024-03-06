import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
// import { customSessionStorage } from '../storages/session.storage';
import { firebaseStorage } from '../storages/firebase.storage';
import { useWeddingBounceStore } from '../wedding';

interface PersonState{
  firstName:string;
  lastName:string;
}

interface Actions {
  setFirstName: (firstName:string) => void;
  setLastName: (lastName:string) => void;
}

const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',
  setFirstName: (firstName:string) => set(({firstName}), false, 'setFirstName'),
  setLastName: (lastName:string) => set(({lastName}), false, 'setLastName'),
})



export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(
      storeAPI, 
      {
        name: 'person-store',
        // storage: customSessionStorage
        // storage: firebaseStorage
      }
    )
  )
);

usePersonStore.subscribe((nextState) => {
  const {firstName, lastName} = nextState;
  useWeddingBounceStore.getState().setFirstName(firstName);
  useWeddingBounceStore.getState().setLastName(lastName);
})
