<script>
	import { DialogForm, Input, Select } from '$lib/components';
	import { stainingFields } from './stainining_fields.js';

	/** @type {boolean} */
	export let open;

	/** @type {import('$types').StainingWithFields | undefined} */
	export let staining;

	/** @type {string} */
	let coverslipId;
	/**
     * @type {(Partial<import('@prisma/client').StainingField> & {
	 *     op: 'create' | 'edit' | 'delete';
	 * })[]}
     */
	let fields;
	/** @type {string} */
	let id;

	$: if (staining) updateValues(staining);

	/**
     * @param {import('$types').StainingWithFields} staining
     */
	function updateValues(staining) {
		({ id, coverslipId } = staining);
		fields = staining.fields.map((field) => ({
			...field,
			op: 'edit',
		}));
	}


	function addStaining() {
		fields = [...fields, { op: 'create', id: String(Math.random()), name: '', value: '' }];
	}

	/** @param {number} index */
	function removeStaining(index) {
		const toRemove = fields[index];
		if (toRemove.op === 'create') {
			fields = [
				...fields.slice(0, index),
				...fields.slice(index + 1),
			];
		} else {
			fields[index].op = 'delete';
		}
	}
</script>

<DialogForm header='Edit staining' bind:open action='/coverslip/{coverslipId}/staining?/edit'
	--br-dialog-root-max-block-size="min(90dvb, 100%);">
	<input type='hidden' name='id' value={id}/>
	<input type='hidden' name='coverslipId' value={coverslipId}/>
	{#each fields as field, index (field.id)}
		{#if field.op === 'delete'}
			<input type='hidden' name='fields[{index}][op]' value='delete'/>
			<input type='hidden' name='fields[{index}][id]' value={field.id}/>
		{/if}
	{/each}
	<button type="button" on:click={addStaining}>Add staining field</button>
	{#each fields as field, index (field.id)}
		{#if field.op !== 'delete'}
			<div class="field">
				<div class="double-column">
					{#if field.op === 'edit'}
						<input type='hidden' name='fields[{index}][id]' value={field.id}/>
					{/if}
					<input type='hidden' name='fields[{index}][op]' value={field.op}/>
					<Select label='Field' name='fields[{index}][name]' required>
						{#each Object.entries(stainingFields) as [fieldId, name] (fieldId)}
							{#if field.name === fieldId}
								{console.log('selected', { name })}
								<option value={fieldId} selected>{name}</option>
							{:else}
								<option value={fieldId}>{name}</option>
							{/if}
						{/each}
					</Select>
					<Input label='Value' name='fields[{index}][value]' placeholder='Value' value={field.value} required/>
				</div>
				<button class="remove" type="button" on:click={() => removeStaining(index)}>Remove</button>
			</div>
		{/if}
	{/each}
</DialogForm>

<style>
	.field {
		display: flex;
		gap: 15px;
	}
	button.remove {
		margin-block-start: 28px;
	}
</style>
