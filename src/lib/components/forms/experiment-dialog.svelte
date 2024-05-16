<script>
	import '@kwangure/strawberry/css/styles';
	import '@kwangure/strawberry/default/button';
	import '@kwangure/strawberry/default/sidebar';
	import '$lib/css/global.css';
	import { DialogForm, Input, Select } from '$lib/components';

	/** @type {'create' | 'edit'} */
	export let op;
	/** @type {boolean} */
	export let open;
	/** @type {Partial<import('@prisma/client').Experiment> | undefined} */
	export let experiment = undefined;

	$: action = op === 'edit' ? '/experiments?/edit' : '/experiments?/new';
	$: header = op === 'create' ? 'Edit project' : 'Create project';
	$: id = experiment?.id ?? '';
	$: projectId = experiment?.projectId ?? '';
	$: title = experiment?.title ?? '';

	/** @type {import('@prisma/client').Project[]} */
	let projects = [];

	$: if (open) {
		projects = [];
		(async () => {
			projects = await fetch('/api/v1/projects')
				.then((request) => request.json())
				.catch(() => []);
		})();
	}
</script>

<DialogForm {header} bind:open {action}>
	{#if op === 'edit'}
		<input type='hidden' name='id' value={id}/>
	{/if}
	<Select label='Project' placeholder='Select a project' required name='projectId'>
		{#each projects as { id, title } (id)}
			<option value={id} selected={id === projectId}>{title}</option>
		{/each}
	</Select>
	<Input label='Experiment title' name='title' placeholder='Untitled experiment'
		value={title} required/>
</DialogForm>
