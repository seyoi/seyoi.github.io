import { atom } from 'jotai';

export interface User {
  id: number;
  계정: string;
  닉네임: string;
}

export const nicknameAtom = atom('nick');
export const userAtom = atom<User | null>(null);
export const accessTokenAtom = atom<string | null>(null);
export const csrfTokenAtom = atom<string | null>(null);
