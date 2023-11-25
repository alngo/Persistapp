<script>
	import { store } from './store.ts';

	const onClick = () => {
		store.update((n) => n + 1);
	};
</script>

<div>
	{$store}
	<button on:click={onClick}>increment</button>
</div>
