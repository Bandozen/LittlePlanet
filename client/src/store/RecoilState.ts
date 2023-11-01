import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'; // ✔

const { persistAtom } = recoilPersist(); // ✔

export const userEmail = atom<string>({
	key: 'userEmail',
	default: '', // 초기값 설정
	effects_UNSTABLE: [persistAtom],
});
