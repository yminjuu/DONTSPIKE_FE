import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const favFoodState = atom({
  key: 'favFoodState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
