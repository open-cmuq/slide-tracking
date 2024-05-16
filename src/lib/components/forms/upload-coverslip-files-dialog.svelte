<script>
	import { DialogForm, Inputs } from '$lib/components';

	/** @type {boolean} */
	export let open;
	/** @type {string} */
	export let coverslipId;

	/** @type {FileList | undefined} */
	let files;
</script>

<DialogForm header='Upload file' bind:open action='/coverslip/{coverslipId}/files?/new'
	--br-dialog-root-max-block-size="min(90dvb, 100%);">
	<input type='hidden' name='coverslipId' value={coverslipId}/>
	<Inputs.File bind:value={files} multiple name='files'/>
</DialogForm>

