<script>
	import '@kwangure/strawberry/css/styles';
	import '@kwangure/strawberry/default/button';
	import '$lib/css/global.css';
	import { Arrow, Dropdown, Popup } from '@kwangure/strawberry/default/dropdown';
	import { ButtonItem, EmptyList, Form, Item, MdiIcon, Navbar } from '$lib/components';
	import { mdiClipboardTextMultipleOutline, mdiMirrorRectangle, mdiPlus, mdiTestTube } from '@mdi/js';
	import { Section } from '@kwangure/strawberry/default/sidebar';
	import { setContext } from 'svelte';

	/** @type {import('./$types').LayoutServerData} */
	export let data;

	/** @type {boolean} */
	let openProjectsModal;
	/** @type {Partial<import('@prisma/client').Project> | undefined} */
	let project;
	/** @type {'create' | 'edit'} */
	let projectOp;
	/** @type {import('$types').ProjectPrompt} */
	function promptProject(op, toEdit) {
		projectOp = op;
		project = toEdit;
		openProjectsModal = true;
	}

	/** @type {boolean} */
	let openExperimentsModal;
	/** @type {Partial<import('@prisma/client').Experiment> | undefined} */
	let experiment;
	/** @type {'create' | 'edit'} */
	let experimentOp;
	/** @type {import('$types').ExperimentPrompt} */
	function promptExperiment(op, toEdit) {
		experimentOp = op;
		experiment = toEdit;
		openExperimentsModal = true;
	}

	/** @type {boolean} */
	let openSlideModal;
	/** @type {Partial<import('@prisma/client').Slide> | undefined} */
	let slide;
	/** @type {'create' | 'edit'} */
	let slideOp;
	/** @type {import('$types').SlidePrompt} */
	function promptSlide(op, toEdit) {
		slideOp = op;
		slide = toEdit;
		openSlideModal = true;
	}

	/** @type {boolean} */
	let openCreateCoverslipModal;
	/** @type {string} */
	let coverslipSlideId;
	/** @type {import('$types').Prompt['createCoverslip']} */
	function createCoverslip(slideId) {
		openCreateCoverslipModal = true;
		coverslipSlideId = slideId;
	}


	/** @type {boolean} */
	let openCreateStainingModal;
	/** @type {string} */
	let stainingCoverslipId;
	/** @type {import('$types').Prompt['createStaining']} */
	function createStaining(coverslipId) {
		openCreateStainingModal = true;
		stainingCoverslipId = coverslipId;
	}

	/** @type {boolean} */
	let openEditCoverslipModal;
	/** @type {import('@prisma/client').Coverslip} */
	let coverslip;
	/** @type {import('$types').Prompt['editCoverslip']} */
	function editCoverslip(toEdit) {
		openEditCoverslipModal = true;
		// @ts-ignore
		coverslip = toEdit;
	}

	/** @type {boolean} */
	let openEditCoverslipsModal;
	let coverslipids;
	let slideid;
	/** @type {import('$types').Prompt['editCoverslips']} */
	function editCoverslips(toEdit, givenSlide) {
		openEditCoverslipsModal = true;
		// @ts-ignore
		coverslipids = toEdit;
		slideid = givenSlide;
	}

	/** @type {boolean} */
	let openEditCoverslipModal2;
	/** @type {import('$types').Prompt['editCoverslip2']} */
	function editCoverslip2(toEdit) {
		openEditCoverslipModal2 = true;
		// @ts-ignore
		coverslip = toEdit;
	}

	/** @type {boolean} */
	let openEditStainingModal;
	/** @type {import('$types').StainingWithFields} */
	let staining;
	/** @type {import('$types').Prompt['editStaining']} */
	function editStaining(toEdit) {
		openEditStainingModal = true;
		// @ts-ignore
		staining = toEdit;
	}

	/** @type {boolean} */
	let openDeleteExperimentModal;
	/** @type {import('@prisma/client').Experiment} */
	let experimentToDelete;
	/** @type {import('$types').Prompt['deleteExperiment']} */
	function deleteExperiment(item) {
		experimentToDelete = item;
		openDeleteExperimentModal = true;
	}

	/** @type {boolean} */
	let openDeleteProjectModal;
	/** @type {import('@prisma/client').Project} */
	let projectToDelete;
	/** @type {import('$types').Prompt['deleteProject']} */
	function deleteProject(item) {
		projectToDelete = item;
		openDeleteProjectModal = true;
	}

	/** @type {boolean} */
	let openDeleteSlideModal;
	/** @type {import('@prisma/client').Slide} */
	let slideToDelete;
	/** @type {import('$types').Prompt['deleteSlide']} */
	function deleteSlide(item) {
		slideToDelete = item;
		openDeleteSlideModal = true;
	}

	/** @type {boolean} */
	let openDeleteCoverslipModal;
	/** @type {import('@prisma/client').Coverslip} */
	let coverslipToDelete;
	/** @type {import('$types').Prompt['deleteCoverslip']} */
	function deleteCoverslip(item) {
		coverslipToDelete = item;
		openDeleteCoverslipModal = true;
	}

	/** @type {boolean} */
	let openDeleteStainingpModal;
	/** @type {import('@prisma/client').Staining} */
	let stainingToDelete;
	/** @type {import('$types').Prompt['deleteStaining']} */
	function deleteStaining(item) {
		stainingToDelete = item;
		openDeleteStainingpModal = true;
	}

	/** @type {boolean} */
	let openDeleteCoverslipFileModal;
	/** @type {import('@prisma/client').CoverslipFile} */
	let coverslipFileToDelete;
	/** @type {import('$types').Prompt['deleteFile']} */
	function deleteFile(item) {
		coverslipFileToDelete = item;
		openDeleteCoverslipFileModal = true;
	}

	/** @type {boolean} */
	let openUploadCoverslipFileModal;
	/** @type {string} */
	let fileCoverslipId;
	/** @type {import('$types').Prompt['uploadCoverslipFiles']} */
	function uploadCoverslipFiles(coverslipId) {
		openUploadCoverslipFileModal = true;
		fileCoverslipId = coverslipId;
	}

	/** @type {import('$types').Prompt} */
	const prompt = {
		createCoverslip,
		createStaining,
		deleteExperiment,
		deleteFile,
		deleteProject,
		deleteSlide,
		deleteCoverslip,
		deleteStaining,
		editCoverslip,
		editCoverslips,
		editCoverslip2,
		editStaining,
		experiment: promptExperiment,
		project: promptProject,
		slide: promptSlide,
		uploadCoverslipFiles,
	};
	setContext('prompt', prompt);

	$: createExperimentDisabledHint = data.projectCount
		? ''
		: 'Create at least one project first.';
	$: createSlideDisabledHint = data.experimentCount
		? ''
		: 'Create at least one experiment first.';
</script>

<div class="layout">
	<Navbar/>
	<div class="content">
		<div class="br-sidebar">
			<Section>
				<Dropdown>
					<button slot="trigger">
						<MdiIcon d={mdiPlus}/>Create New
					</button>
					<Popup>
						<Arrow/>
						<ButtonItem on:click={() => promptProject('create')}>
							<MdiIcon d={mdiClipboardTextMultipleOutline}/>
							Project
						</ButtonItem>
						<ButtonItem on:click={() => promptExperiment('create')} disabledHint={createExperimentDisabledHint}>
							<MdiIcon d={mdiTestTube}/>
							Experiment
						</ButtonItem>
						<ButtonItem on:click={() => promptSlide('create')} disabledHint={createSlideDisabledHint}>
							<MdiIcon d={mdiMirrorRectangle}/>
							Slide
						</ButtonItem>
					</Popup>
				</Dropdown>
			</Section>
			<Section title='My projects'>
				{#if data.user}
					{#each data.projects as project (project.id)}
						<Item.Project {project}/>
					{:else}
						<EmptyList>
							Your projects will appear here when you add them
						</EmptyList>
					{/each}
				{:else}
					<EmptyList>
						Your projects will appear here when you sign in
					</EmptyList>
				{/if}
			</Section>
		</div>
		<main>
			<slot/>
		</main>
	</div>
</div>

<Form.ProjectDialog op={projectOp} bind:open={openProjectsModal} {project}/>
<Form.ExperimentDialog op={experimentOp} bind:open={openExperimentsModal} {experiment}/>
<Form.SlideDialog op={slideOp} bind:open={openSlideModal} {slide}/>
<Form.EditCoverslipDialog bind:open={openEditCoverslipModal} {coverslip}/>
<Form.EditCoverslipDialog2 bind:open={openEditCoverslipModal2} {coverslip}/>
<Form.EditCoverslipsDialog bind:open={openEditCoverslipsModal} {coverslipids} {slideid}/>
<Form.EditStainingDialog bind:open={openEditStainingModal} {staining}/>
<Form.CreateCoverslipDialog bind:open={openCreateCoverslipModal} slideId={coverslipSlideId}/>
<Form.CreateStainingDialog bind:open={openCreateStainingModal} coverslipId={stainingCoverslipId}/>
<Form.DeleteExperimentDialog experiment={experimentToDelete} bind:open={openDeleteExperimentModal}/>
<Form.DeleteProjectDialog project={projectToDelete} bind:open={openDeleteProjectModal}/>
<Form.DeleteSlideDialog slide={slideToDelete} bind:open={openDeleteSlideModal}/>
<Form.DeleteCoverslipDialog coverslip={coverslipToDelete} bind:open={openDeleteCoverslipModal}/>
<Form.DeleteStainingDialog staining={stainingToDelete} bind:open={openDeleteStainingpModal}/>
<Form.DeleteFileDialog file={coverslipFileToDelete} bind:open={openDeleteCoverslipFileModal}/>
<Form.UploadCoverslipFilesDialog coverslipId={fileCoverslipId} bind:open={openUploadCoverslipFileModal}/>

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
		width: var(--br-size-17);
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