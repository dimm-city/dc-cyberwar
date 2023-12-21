<script>
	import { Card } from './model/Card';
	export let card = new Card();
	export let selected = false;
</script>

<div
	role="button"
	tabindex="0"
	on:click
	on:keyup
	class="card"
	class:selected
	data-augmented-ui="br-clip bl-clip tr-clip tl-2-clip-x"
>
	<div class="card-content">
		<div class="card-title">
			{card.name}
		</div>
		<div class="card-type" data-augmented-ui>{card.type}</div>
		<div class="card-description">
			{card.description ?? '&nbsp;'}
		</div>
		<div class="card-footer">
			<span data-augmented-ui="">ATK: {card.attack}</span>
			<span data-augmented-ui="">DEF: {card.defense}</span>
		</div>
	</div>
</div>

<style>
	.card {
		aspect-ratio: 9/16;
		width: 12rem;
		display: flex;
		background-color: #1c1c1c;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
		--aug-tl: 3px;
	}

	.card-content {
		display: grid;
		grid-template-rows: 7% 5% 73% 15%;
		color: #fff;
		text-shadow: 1px 1px #000;
		width: 100%;
	}

	.card-title {
		font-size: clamp(0.5rem, 1rem, 0.7rem);
		white-space: nowrap;
		font-weight: bold;
		text-align: center;
		align-self: center;
	}

	.selected .card-title {
		color: rgb(94, 94, 94);
	}
	.card-type {
		font-size: 0.75rem;
		text-align: center;
		align-self: center;
	}

	.card-description {
		content: '';
		font-size: 0.8rem;
		color: #ccc;
		overflow-y: hidden;
		padding: 0.5rem;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		background-color: #1c1c1c;
		background-image: linear-gradient(to bottom, #2b033dc4, #0e0020);
	}

	.card-footer span {
		font-size: 1.1rem;
		padding-inline: 0.75rem;
		font-weight: bold;
		color: #fff;
		text-shadow: 1px 1px #000;
		align-self: center;
		width: min-content;
		white-space: nowrap;
		--aug-all-height: 2rem;
		--aug-border-all: 1px;
	}
</style>
