<script>
	import '@kwangure/strawberry/default/item';
	import { Experiment, Toggle } from '.';
	import { page } from '$app/stores';
	import { Section } from '@kwangure/strawberry/default/sidebar';

	/**
	 * @typedef {import('$types').BreadcrumbProject} BreadcrumbProject
	 * @typedef {(import('@prisma/client').Project & {
	 *    experiments: (import('@prisma/client').Experiment & {
	 *        slides: import('@prisma/client').Slide[];
	 *    })[];
	 * })} AugmentedProject
	 */

	/**
	 * @type {AugmentedProject}
	 */
	export let project;

	$: ({ breadcrumbs } = $page.data);
	$: setDefaultOpen(project, breadcrumbs);

	let openToggle = false;
	/**
     * @param {AugmentedProject} project
     * @param {import("$types").Breadcrumb[]} breadcrumbs
     */
	function setDefaultOpen(project, breadcrumbs) {
		const breadcrumb = /** @type {BreadcrumbProject | undefined} */(
			breadcrumbs[1]
		);

		openToggle = project.id === breadcrumb?.id;
	}
</script>

<Toggle href="/project/{project.id}" open={openToggle} active={false}>
	{project.title}
</Toggle>
{#if openToggle}
	<Section>
		{#each project.experiments as experiment (experiment.id)}
			<Experiment {experiment}/>
		{:else}
			<div class="missing">No experiments</div>
		{/each}
	</Section>
{/if}

<style>
	.missing {
		padding-inline: var(--br-size-5);
		opacity: 0.75;
	}
</style>
