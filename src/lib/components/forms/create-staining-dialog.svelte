<script>
	import { DialogForm, Input, Select } from '$lib/components';
	import { stainingFields } from './stainining_fields.js';

	/** @type {boolean} */
	export let open;
	/** @type {string} */
	export let coverslipId;

	/**
     * @type {{ field: string; value: string;}[]}
     */
	let fields = [{ field: '', value: '' }];

	function addStaining() {
		fields = [...fields, { field: '', value: '' }];
	}

	/** @param {number} index */
	function removeStaining(index) {
		fields = [
			...fields.slice(0, index),
			...fields.slice(index + 1),
		];
	}
</script>

<DialogForm header='Create staining' bind:open action='/coverslip/{coverslipId}/staining?/new'
	--br-dialog-root-max-block-size="min(90dvb, 100%);">
	<input type='hidden' name='coverslipId' value={coverslipId}/>
	<button type="button" on:click={addStaining}>Add staining field</button>
	{#each fields as _field, index}
		<div class="field">
			<div class="double-column">
				<Select label='Field' name={`fields[${index}][name]`} required>
					{#each Object.entries(stainingFields) as [field, name]}
						<option value={field}>{name}</option>
					{/each}
				</Select>
				<Input label='Value' name={`fields[${index}][value]`} placeholder='Value' required/>
			</div>
			<button class="remove" type="button" on:click={() => removeStaining(index)}>Remove</button>
		</div>
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
