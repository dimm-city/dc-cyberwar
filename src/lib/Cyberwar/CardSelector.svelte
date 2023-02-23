<script>
	import { onMount } from 'svelte';
	import Card from './Card.svelte';

	export let availableCards = [];
	export let selectedCards = [];

	onMount(() => {
		selectedCards = [];
	});

	function selectCard(card) {
		console.log('select', card);
		if (selectedCards.includes(card)) {
			selectedCards = selectedCards.filter((c) => c !== card);
		} else {
			selectedCards = [...selectedCards, card];
		}
	}

	$: cardsList = availableCards; //.filter((c) => !selectedCards.includes(c));
</script>

<style>
	.card-selector {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
	}
</style>
<h4>{selectedCards.length} scripts selected</h4>
<div class="card-selector">
	{#each cardsList as card}
		<Card {card} selected={selectedCards.includes(card)} on:click={() => selectCard(card)} />
	{/each}
</div>
