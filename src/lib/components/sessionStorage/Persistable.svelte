<script>
	import { store } from './store.ts';

	const onIncrement = () => {
		store.update((n) => n + 1);
	};

	const onReset = () => {
		$store = 0;
	};
</script>

<div>
	{$store}
	<button on:click={onIncrement}>increment</button>
	<button on:click={onReset}>reset</button>
</div>
