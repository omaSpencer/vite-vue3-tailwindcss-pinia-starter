import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
	state: () => ({
		counter: 0,
		name: 'Spencer',
	}),
	getters: {
		doubleCount: (state) => state.counter * 2,
	},
	actions: {
		//* can be async too
		reset() {
			this.counter = 0;
		},
		addOne() {
			this.counter++;
		},
	},
});
