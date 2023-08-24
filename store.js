import { create } from "zustand";

const store = (set) => ({
	floats: [
		{ denom: "£50", amount: 0.0, step: 50.0 },
		{ denom: "£20", amount: 0.0, step: 20.0 },
		{ denom: "£10", amount: 0.0, step: 10.0 },
		{ denom: "£5", amount: 0.0, step: 5.0 },
		{ denom: "£2", amount: 0.0, step: 2.0 },
		{ denom: "£1", amount: 0.0, step: 1.0 },
		{ denom: "50p", amount: 0.0, step: 0.5 },
		{ denom: "20p", amount: 0.0, step: 0.2 },
		{ denom: "10p", amount: 0.0, step: 0.1 },
		{ denom: "5p", amount: 0.0, step: 0.05 },
		{ denom: "2p", amount: 0.0, step: 0.02 },
		{ denom: "1p", amount: 0.0, step: 0.01 },
	],
	increaseFloat: (denom, amount) =>
		set((store) => ({ floats: [...store.floats, { denom, amount }] })),
});

export const useStore = create(store);
