<script>
	import { store } from './store.ts';

	const onIncrement = () => {
		store.put($store + 1);
	};

	const onReset = () => {
		store.put(0);
	};
</script>

<div>
	{$store}
	<button on:click={onIncrement}>increment</button>
	<button on:click={onReset}>reset</button>
</div>
