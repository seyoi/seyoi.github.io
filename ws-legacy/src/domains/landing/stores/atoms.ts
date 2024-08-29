import { atom, selector } from "recoil";

// Atom to hold the modal state
export const bookModalState = atom({
  key: "isActive", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// Selector to get the modal state
export const bookSelector = selector({
  key: "isActiveSelector",
  get: ({ get }) => {
    const active = get(bookModalState);
    return active;
  },
});
