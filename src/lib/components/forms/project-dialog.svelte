<script>
	import '@kwangure/strawberry/css/styles';
	import '@kwangure/strawberry/default/button';
	import '@kwangure/strawberry/default/sidebar';
	import '$lib/css/global.css';
	import { DialogForm, Input } from '$lib/components';

	/** @type {'create' | 'edit'} */
	export let op;
	/** @type {boolean} */
	export let open;
	/** @type {Partial<import('@prisma/client').Project> | undefined} */
	export let project = undefined;

	$: action = op === 'edit' ? '/projects?/edit' : '/projects?/new';
	$: header = op === 'edit' ? 'Edit project' : 'Create project';
	$: id = project?.id ?? '';
	$: title = project?.title ?? '';
</script>

<DialogForm {header} bind:open {action}>
	{#if op === 'edit'}
		<input type='hidden' name='id' value={id}/>
	{/if}
	<Input label='Project title' name='title' placeholder='Untitled project'
		value={title} required/>
</DialogForm>
