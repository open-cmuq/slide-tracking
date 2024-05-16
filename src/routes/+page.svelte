<script>
	import '@kwangure/strawberry/css/styles';
	import '@kwangure/strawberry/default/button';
	import '$lib/css/global.css';
	import { EmptyList, MdiIcon, Navbar } from '$lib/components';
	import { mdiPlus } from '@mdi/js';
	import { Section } from '@kwangure/strawberry/default/sidebar';
</script>

<svelte:head>
	<title>Projects | Slide Tracking</title>
</svelte:head>

<div class="layout">
	<Navbar/>
	<div class="content">
		<div class="br-sidebar">
			<Section>
				<button title='Sign in to ceate an item'>
					<MdiIcon d={mdiPlus}/>Create New
				</button>
			</Section>
			<Section title='My projects'>
				<EmptyList>
					Your projects will appear here when you sign in
				</EmptyList>
			</Section>
		</div>
		<main>
			<EmptyList>
				Your projects will appear here when you sign in
			</EmptyList>
		</main>
	</div>
</div>

<style>
	.layout {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.layout {
		--viewport-margin: var(--br-size-10);
	}
	.content {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: var(--br-size-10);
		height: 100%;
	}
	.br-sidebar {
		--br-list-item-height: var(--br-size-8);
		--br-sidebar-section-indent: var(--br-size-4);
		padding-block: var(--br-size-4);
	}
	main {
		margin-right: var(--viewport-margin);
		display: flex;
		flex-direction: column;
		/* collapse width on overflow */
        min-width: 0;
	}
</style>