<script>
	import { Breadcrumb, ButtonItem, Coverslip, Item, ItemListDivider, MdiIcon, Plate, Slide, CoverslipTable } from '$lib/components';
	import { format } from 'date-fns';
	import '@kwangure/strawberry/default/button';

	import { getContext, onMount } from 'svelte';
	import { mdiCheck, mdiChevronRight, mdiNoteEdit, mdiPen, mdiPhoneReturn, mdiPlus, mdiPrinter, mdiTable } from '@mdi/js';
	import { page } from '$app/stores';


	$: ({ slideId } = $page.params);

	/** @type {import('$types').Prompt} */
	const prompt = getContext('prompt');

	/** @type {import('./$types').PageServerData} */
	export let data;

	function printQRCode() {
		const svgElement = document.querySelector(`svg#id${slideId}`);

		if (!svgElement) {
			console.warn('Unable to find SVG with the specified ID for printing');
			return;
		}

		const cloned = svgElement.cloneNode(true);
		cloned.style.zIndex = '9999';
		cloned.classList.add('printable');
		cloned.style.display = 'absolute';
		// dimensions given by the prof
		cloned.style.width = '1.5cm';
		cloned.style.height = '1.5cm';

		document.body.appendChild(cloned);

		window.print();
		document.body.removeChild(cloned);
}

	let selectmode = true;

	let selectedWells = new Set();

	/**
     * @param {string} coverslipId
     */
	function handleClick(coverslipId) {
		if (selectmode) {
			if (selectedWells.has(coverslipId)) {
				selectedWells.delete(coverslipId);
			} else {
				selectedWells.add(coverslipId);
			}
	
			// Trigger reactivity manually
			selectedWells = new Set(selectedWells);

			// console.log(Array.from(selectedWells));
		}
	}

	let anchors = data.slide?.coverslips.map(() => ({})); // This will store the bounding rectangles
	
	onMount(() => {
		// on reload, get the locations of coverslips on plate
		if (data.slide.type == 'plate') {
			anchors = anchors.map((anchor, index) => {
			const element = document.querySelector(`.my-anchor-${index}`);
			return {
				...anchor,
				element,
				rect: element.getBoundingClientRect(),
			};
		});
		}
	});

	// TODO: when the window resizes, anchor locations are updated
	/* window.addEventListener('resize', () => {
		anchors = anchors.map((anchor) => ({
		...anchor,
		rect: anchor.element.getBoundingClientRect()
		}));
	}); */

	function handleSelect() {
		if (selectmode) {
			selectedWells = new Set();
			selectmode = false;
		} else {
			selectmode = true;
		}
	}

	// for selector box feature

	let isDrawingRectangle = false;
	let startX, startY, endX, endY;
	let selectionRectangle;

	function handleMouseDown(event) {
		if (selectmode && isDrawingRectangle == false) {
			// Get the starting point
			startX = event.clientX;
			startY = event.clientY;
			isDrawingRectangle = true;
		}
	}

	function handleMouseUp(event) {
		if (selectmode) {
			endX = event.clientX;
			endY = event.clientY;
			selectCircles();
		}
		if (isDrawingRectangle) {
			isDrawingRectangle = false;
		}
	}

	// handles mouse move for selection rectangle
	function handleMouseMove(event) {
		// console.log("drawing", isDrawingRectangle)
		const element = document.querySelector(`.platediv`);
		const plateRect = element.getBoundingClientRect();
		// console.log("plateRect", plateRect, element)
		const insideRectX = event.clientX > plateRect.left && event.clientX < plateRect.right
		const insideRectY = event.clientY > plateRect.top && event.clientY < plateRect.bottom

		if (isDrawingRectangle && selectmode && insideRectX && insideRectY  ) {
			// Update the size and position of the selection rectangle based on the mouse position
			const rect = selectionRectangle.getBoundingClientRect();
		
			const currentX = event.clientX;
			const currentY = event.clientY;

			// Calculate width and height based on starting and current mouse position
			const width = Math.abs(currentX - startX);
			const height = Math.abs(currentY - startY);

			// Set position and size of the selectionRectangle
			selectionRectangle.style.left = `${Math.min(startX, currentX)}px`;
			selectionRectangle.style.top = `${Math.min(startY, currentY)}px`;
			selectionRectangle.style.width = `${width}px`;
			selectionRectangle.style.height = `${height}px`;
			selectionRectangle.style.display = 'block';
			// console.log(selectionRectangle.style) // check for update in values

		}
	}


	function selectCircles() {
		// Calculate which circles are within the bounds of the rectangle
		// and update the selectedWells set accordingly
		// This will require knowledge of the position of each circle
		const topEdge = Math.min(startY, endY);
		const bottomEdge = Math.max(startY, endY);
		const leftEdge = Math.min(startX, endX);
		const rightEdge = Math.max(startX, endX);

		anchors.forEach((anchor, index) => {
			// Get the bounding rectangle of the current anchor
			const rect = anchor.rect;

			// Check if the anchor is within the selection rectangle bounds
			if (rect.left < rightEdge && rect.right > leftEdge &&
				rect.top < bottomEdge && rect.bottom > topEdge) {
				// If it is, add the corresponding coverslip id to the selectedWells set
				selectedWells.add(data.slide.coverslips[index].id);
			}
		});

		// You may need to inform Svelte to update the component if selectedWells has changed
		selectedWells = new Set(selectedWells);
  }
	
</script>

<svelte:head>
	<title>{data.slide.title} | Slide Tracking</title>
</svelte:head>

<Breadcrumb.Bar>
	<Breadcrumb.Link href='/projects'>
		My projects
	</Breadcrumb.Link>
	<MdiIcon d={mdiChevronRight}/>
	<Breadcrumb.List/>
	<MdiIcon d={mdiChevronRight}/>
	<Item.Dropdown title={data.slide.title}>
		<ButtonItem on:click={prompt.slide.bind(null, 'edit', data.slide)}>
			{(data.slide.type === 'plate' ? 'Edit plate' : 'Edit slide')}
		</ButtonItem>
		{#if data.slide.type == 'slide'}
			<ButtonItem on:click={prompt.deleteSlide.bind(null, data.slide)}>Delete slide
			</ButtonItem>
		{/if}
		<ItemListDivider/>
		
		<ButtonItem on:click={prompt.createCoverslip.bind(null, slideId)}>
			Add coverslip
		</ButtonItem>

		<ButtonItem on:click={printQRCode}>
			Print the QR Code
		</ButtonItem>
	</Item.Dropdown>

</Breadcrumb.Bar>

<div class="wrapper">
		{#if selectmode}
		<div class="selection-rectangle" bind:this={selectionRectangle}></div>
		{/if}
	<div class="slide noselect">

		{#if data.slide.type == 'slide'}
		<Slide {slideId}>
			{#each data.slide.coverslips as coverslip, i}
				<Coverslip {coverslip} href='/coverslip/{coverslip.id}'>
					#{i + 1}
				</Coverslip>
			{/each}
		</Slide>
		{:else}
		<button class = "selectbutton"
			style="background-color: {selectmode ? 'orange' : 'green'};"
			on:click={handleSelect}>
			{#if selectmode }
				<MdiIcon d={mdiPlus}/>
			{:else}
				<MdiIcon d={mdiCheck}/>
			{/if}
		</button>
		
		<Plate {slideId}>
			<div class = "platediv" 
				on:mousedown={handleMouseDown} 
				on:mouseup={handleMouseUp}
				on:mousemove={handleMouseMove} >
				<div class = "plate-grid">
					{#each data.slide?.coverslips as coverslip, i}
						<a bind:this={anchors[i]}
							class:selected-well={selectedWells.has(coverslip.id)}
							class:empty-coverslip={!selectedWells.has(coverslip.id)}
							class={`my-anchor-${i}`}
							on:click = {() => handleClick(coverslip.id)} href = {selectmode ? '' : `/coverslip/${coverslip.id}`}>
								{#if selectedWells.has(coverslip.id)}
									+
								{:else}
									{i+1}
								{/if}
						</a>
					{/each}
				</div>
			</div>
		</Plate>
			{#if selectmode}
			<button class = "editbutton" on:click={selectedWells.size!=0 ? prompt.editCoverslips.bind(null, Array.from(selectedWells), data.slide.id) : {}}>Edit selected</button>
			{/if}
		{/if}

	</div>
	<div>
		<div class="item">
			<div class="experiment-container">
				<div class='field'>Experiment</div>
				<a class='value' href='/experiment/{data.slide.experiment.id}'>
				  {data.slide.experiment.title}
				</a>
			  </div>
			  
				<div class="add-button-container">
					{#if data.slide.type == 'slide'}
						<button on:click={prompt.createCoverslip.bind(null, slideId)}>
							<MdiIcon d={mdiPlus}/>
							Add coverslip
						</button>
						<button on:click={prompt.slide.bind(null, 'edit', data.slide)}>
							<MdiIcon d={mdiNoteEdit}/>
							Edit slide
						</button>
						<button on:click={printQRCode}>
							<MdiIcon d={mdiPrinter}/>
						</button>
					{:else}
						<Item.Link href = '/slide/{slideId}/table'>
						<button >
							<MdiIcon d={mdiTable}/>
							Table view
						</button>
						</Item.Link>
					 {/if}
				</div>
			 
		</div>
		<div class="item">
			<div class='field'>Location</div>
			<div class='value'>
				Box {#if data.slide.boxNumber}{data.slide.boxNumber}
				{:else}<em>unknown</em>,{/if}
				position {#if data.slide.boxPosition}{data.slide.boxPosition}
				{:else}<em>unknown</em>{/if}
			</div>
		</div>
		<div class="double-column">
			<div class="item">
				<div class='field'>Prepared by</div>
				<div class='value'>{data.slide.createdBy.name}</div>
			</div>
			<div class="item">
				<div class='field'>Observed on</div>
				<div class='value'>{format(new Date(data.slide.observedOn), 'EEEE, MMM dd yyyy')}</div>
			</div>
		</div>
		{#if data.slide.comments}
			<div class="item">
				<div class='field'>Comments</div>
				<div>
					{data.slide.comments}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: var(--br-size-6);
	}
	.slide {
		position: relative;
		padding-inline: var(--br-size-3);
		padding-block: var(--br-size-4);
	}
	.field,
	.value {
		padding-inline: var(--br-sidebar-section-indent, var(--br-size-3));
	}
	.field {
		padding-block: var(--br-size-4) var(--br-size-2);
		text-transform: uppercase;
		color: var(--br-dark, hsl(0, 0%, 60%)) var(--br-light, hsl(0, 0%, 45%));
		font-size: 12.5px;
		line-height: 1;
	}
	@media print {
		body *:not(.printable) {
			display: none;
		}

		.printable {
			display: block;
			width: 1.5in;
			height: 1.5in;
		}
	}
	.plate-grid {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 4px; /* adjust */
	}
	.platediv {
		display: flex;
		width: 100%;
		height: 100%;
		padding: 10px;
	}
	.add-button-container {
		position: absolute;
		top: 20%;
		right: 200px;
	}

	.empty-coverslip {
		border: 1px solid #ccc;
		background-color: #f5f5f5;
		border-radius: 50%;
		text-align: center;
		color: rgb(135, 135, 135);
	}

	.selected-well {
		background-color: orange;
		border-radius: 50%;
		text-align: center;
		color: black;
	}
	.empty-coverslip:hover {
		border: 1px solid orange;
		background-color: orange;
	}

	.selectbutton {
		position: absolute;
		top: 23px;
		left: 13px;
		border-radius: 50%;
		background-color: orange;
		border: none;
		cursor: pointer;
		color: black;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.editbutton {
		position: absolute;
		top: 75%;
		left: 33%;
		width: 150px;
		font-size: large;
		background-color: rgb(255, 172, 17);
		color: black;
	}

	.selection-rectangle {
		position: absolute;
		border: 1px dashed rgb(255, 204, 0);
		background-color: rgba(255, 187, 0, 0.616);
		display: none;
		z-index: 10;
	}

	.noselect {
		-webkit-user-select: none; /* Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Chrome, Edge, Opera and Firefox */
		}
	.item {
		position: relative;
  		padding-right: 100px;
	}


</style>