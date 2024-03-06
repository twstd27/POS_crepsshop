import { StateStorage, createJSONStorage } from 'zustand/middleware';

const firebaseURL = 'https://crepsshop-7ccc6-default-rtdb.firebaseio.com/zustand';

const storageApi:StateStorage = {
  getItem: async function ( name: string ): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseURL}/${name}.json`).then(res => res.json());
      console.log(data);
      return JSON.stringify(data);
    } catch (error) {
      throw error;
    }
    // const data = sessionStorage.getItem(name);
    // return data;
  },
  setItem: async function ( name: string, value: string ): Promise<void> {
    const data = await fetch(`${firebaseURL}/${name}.json`, {
      method: 'PUT',
      body: value
    }).then(res => res.json());

    console.log(data);

    return;
  },
  removeItem: function ( name: string ): void | Promise<void> {
    sessionStorage.removeItem(name);
  }
}

export const firebaseStorage = createJSONStorage(() => storageApi)