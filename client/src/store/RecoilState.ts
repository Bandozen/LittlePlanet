import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'; // ✔

const { persistAtom } = recoilPersist(); // ✔

export const userEmail = atom<string>({
	key: 'userEmail',
	default: '', // 초기값 설정
	effects_UNSTABLE: [persistAtom],
});

export const studentName = atom<string>({
	key: 'studentName',
	default: '',
	effects_UNSTABLE: [persistAtom],
});

export const deviceStatus = atom<string>({
	key: 'deviceStatus',
	default: '',
	effects_UNSTABLE: [persistAtom],
});
