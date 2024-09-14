import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const modeState = atom({
  key: 'modeState',
  default: 'normal', //normal, senior
  effects_UNSTABLE: [persistAtom],
});
