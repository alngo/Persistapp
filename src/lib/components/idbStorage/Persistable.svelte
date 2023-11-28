<script>
	import { store } from './store.ts';

	const onIncrement = () => {
		store.put($store.get(1) + 1, 1);
	};

	const onReset = () => {
		store.put(0, 1);
	};
</script>

<div>
	{$store.get(1)}
	<button on:click={onIncrement}>increment</button>
	<button on:click={onReset}>reset</button>
</div>
