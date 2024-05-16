<script>
	import '@kwangure/strawberry/default/item';
	import { LinkItem } from '$lib/components';
	import { page } from '$app/stores';
	import { Section } from '@kwangure/strawberry/default/sidebar';
	import { Toggle } from '.';

	/**
	 * @typedef {import('$types').BreadcrumbExperiment} BreadcrumbExperiment
	 *
	 * @typedef {import('@prisma/client').Experiment & {
	 *     slides: import('@prisma/client').Slide[];
	 * }} AugmentedExperiment
	*/

	/**
	 * @type {AugmentedExperiment}
	 */
	export let experiment;

	$: ({ breadcrumbs } = $page.data);
	$: setDefaultOpen(experiment, breadcrumbs);

	let openToggle = false;

	/**
	 * @param {AugmentedExperiment} experiment
	 * @param {import("$types").Breadcrumb[]} breadcrumbs
	 */
	function setDefaultOpen(experiment, breadcrumbs) {
		const breadcrumb = /** @type {BreadcrumbExperiment | undefined} */(
			breadcrumbs[2]
		);

		openToggle = experiment.id === breadcrumb?.id;
	}
</script>

<Toggle href="/experiment/{experiment.id}" open={openToggle} active={false}>
	{experiment.title}
</Toggle>
{#if openToggle}
	<Section>
		{#each experiment.slides as slide (slide.id)}
			<LinkItem href="/slide/{slide.id}">
				{#if slide.title}
					{slide.title}
				{:else}
					Untitled slide
				{/if}
			</LinkItem>
		{:else}
			<div class="missing">No slides or plates</div>
		{/each}
	</Section>
{/if}

<style>
	.missing {
		padding-inline: var(--br-size-5);
		opacity: 0.75;
	}
</style>
