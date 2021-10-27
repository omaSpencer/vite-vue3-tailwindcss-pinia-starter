<script setup>
//? External
import { storeToRefs, mapActions } from 'pinia';
//? Internal
import { useCounterStore } from './store/useCounter';

const main = useCounterStore();

//! Use storeToRefs on computed values
const { counter, name, doubleCount } = storeToRefs(main);

//* - This works too
//? const { addOne } = main;
const { addOne } = mapActions(useCounterStore, ['addOne']);

function add(value) {
	//? Patch object version
	//* main.$patch({
	//*	counter: counter.value + value,
	//*	});

	//? Patch function version
	main.$patch((state) => (state.counter += value));
}

function reset() {
	main.$reset();
}

function clear() {
	main.$state = { counter: 123, name: 'Jack' };
}

//? Subscribe
main.$subscribe((mutation, state) => {
	console.log('mutation', mutation);
	console.log('state', state);
});
</script>

<template>
	<section class="px-3">
		<header class="bg-white shadow" v-if="$route.meta.title">
			<div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<h1 class="flex justify-between text-3xl font-bold leading-tight text-gray-900">
					<span>
						{{ $route.meta.title }}
					</span>
					<span>
						{{ name }}
					</span>
				</h1>
			</div>
		</header>
		<main>
			<div class="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<p>{{ counter }}</p>
				<p>{{ doubleCount }}</p>
				<button
					@click="add(15)"
					class="
						p-2
						pl-5
						pr-5
						bg-blue-500
						text-gray-100 text-lg
						rounded-lg
						focus:border-4
						border-blue-300
					"
				>
					Click Me
				</button>
				<button
					@click="reset"
					class="
						p-2
						pl-5
						pr-5
						bg-red-500
						text-gray-100 text-lg
						rounded-lg
						focus:border-4
						border-blue-300
					"
				>
					Reset Store
				</button>
				<button
					@click="clear"
					class="
						p-2
						pl-5
						pr-5
						bg-yellow-500
						text-gray-100 text-lg
						rounded-lg
						focus:border-4
						border-blue-300
					"
				>
					Jack Store
				</button>
			</div>
			<router-view />
		</main>
	</section>
</template>
