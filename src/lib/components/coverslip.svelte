<script>
	import { createEventDispatcher, tick } from 'svelte';

	export let active = false;
	export let draggable = false;
	/** @type {string} */
	export let href = '';
	/** @type {'drag' | 'auto'} */
	export let position = 'drag';
	/** @type {Partial<import('@prisma/client').Coverslip>} */
	export let coverslip;

	const SEARCH_MIN_X = 0.275;
	const SEARCH_MIN_Y = 0.125;
	const SEARCH_MAX_X = 0.725;
	const SEARCH_MAX_Y = 0.875;

	$: ({ positionX = SEARCH_MIN_X, positionY = SEARCH_MIN_Y, shape = 'round' } = coverslip);

	const dispatch = createEventDispatcher();

	/**
	 * Makes an element draggable within its parent container using the mouse,
	 * touch, or pointer while avoiding collision with sibling elements.
	 *
	 * @param {HTMLElement} node - The element to make draggable.
	 */
	function dragAction(node) {
		/** @type {number} */
		let x;
		/** @type {number} */
		let y;
		/** @type {number} */
		let centerX;
		/** @type {number} */
		let centerY;
		// Using a number between 0 and 1 instead of pixels allowing us to scale
		// the slide + coverslip without mathy non-sense
		/**
		 * A number between the 0 and 1 indicating the x position within the parent
		 * @type {number}
		 */
		let relativeX;
		/**
		 * A number between the 0 and 1 indicating the y position within the parent
		 * @type {number}
		 */
		let relativeY;

		/**
		 * Save the X and Y offset of the center of the coverslip relative
		 * to the position of the mouse so that when the mouse moves we can
		 * preserve the offsets
		 *
		 * @param {PointerEvent} event - The pointerdown event.
		 */
		function handlePointerDown(event) {
			if (!draggable) return;
			node.classList.add('dragging');
			const nodeRect = node.getBoundingClientRect();
			x = (event.clientX) - node.offsetLeft + (nodeRect.width / 2);
			y = (event.clientY) - node.offsetTop + (nodeRect.height / 2);
			node.setPointerCapture(event.pointerId);
			node.addEventListener('pointermove', handlePointerMove);
			node.addEventListener('pointerup', handlePointerUp);
		}

		/**
		 * Handles the pointermove event by updating the position of the element.
		 *
		 * @param {PointerEvent} event - The pointermove event.
		 */
		function handlePointerMove(event) {
			const container = /** @type {HTMLElement} */(node.parentNode);
			const containerRect = container.getBoundingClientRect();
			const nodeRect = node.getBoundingClientRect();

			// The most westerly the center of the coverslip can be
			const minX = (nodeRect.width / 2);
			// The most notherly the center of the coverslip can be
			const minY = (nodeRect.height / 2);
			// The most easterly the center of the coverslip can be
			const maxX = containerRect.width - nodeRect.width + minX;
			// The most southerly the center of the coverslip can be
			const maxY = containerRect.height - nodeRect.height + minY;

			// position the coverslip by the same x & y offset it was relative to
			// the mouse when we started dragging
			centerX = (event.clientX) - x + (nodeRect.width / 2);
			centerY = (event.clientY) - y + (nodeRect.height / 2);
			centerX = Math.max(minX, Math.min(centerX, maxX));
			centerY = Math.max(minY, Math.min(centerY, maxY));

			relativeX = centerX/containerRect.width;
			relativeY = centerY/containerRect.height;

			node.style.setProperty('--pos-x', `${relativeX}`);
			node.style.setProperty('--pos-y', `${relativeY}`);
		}

		/**
		 * Handles the pointerup event by releasing the pointer and removing event listeners.
		 * @param {PointerEvent} _event - The pointerup event.
		 */
		function handlePointerUp(_event) {
			dispatch('position', {
				positionX: Number(relativeX.toFixed(3)),
				positionY: Number(relativeY.toFixed(3)),
			});
			node.classList.remove('dragging');
			node.removeEventListener('pointermove', handlePointerMove);
			node.removeEventListener('pointerup', handlePointerUp);
		}

		node.addEventListener('pointerdown', handlePointerDown);

		return {
			destroy() {
				node.removeEventListener('pointerdown', handlePointerDown);
				node.removeEventListener('pointermove', handlePointerMove);
				node.removeEventListener('pointerup', handlePointerUp);
			},
		};
	}

	/**
     * @param {HTMLElement} node
     * @param {string} position
     */
	function autoPosition(node, position) {
		/** @param {string} position */
		function update(position) {
			if (position !== 'auto') return;
			const currentStyle = node.getAttribute('style') || '';
			const container = /** @type {HTMLElement} */(node.parentNode);
			const siblingRects = Array
				.from(container.children)
				.filter((child) => child !== node)
				.map((sibling) => sibling.getBoundingClientRect());
			outerLoop: for (let x = SEARCH_MIN_X; x < SEARCH_MAX_X; x += 0.1) {
				for (let y = SEARCH_MIN_Y; y < SEARCH_MAX_Y; y += 0.1) {
					node.setAttribute('style', `
						${currentStyle};
						left: ${(x * 100).toFixed(1)}%;
						top: ${(y * 100).toFixed(1)}%;
					`);
					const nodeRect = node.getBoundingClientRect();
					// eslint-disable-next-line
					const collision = siblingRects.some((siblingRect) => (
						nodeRect.right > siblingRect.left
						&& nodeRect.left < siblingRect.right
						&& nodeRect.bottom > siblingRect.top
						&& nodeRect.top < siblingRect.bottom
					));
					if (!collision) {
						positionX = Number(x.toFixed(3));
						positionY = Number(y.toFixed(3));
						dispatch('position', { positionX, positionY });
						break outerLoop;
					}
				}
			}
			node.setAttribute('style', currentStyle);
		}

		// Wait for siblings to be mounted and updated just to be sure
		tick().then(() => {
			update(position);
		});

		return { update };
	}
</script>

{#if href}
	<a href={href} class='coverslip' class:active class:round={shape === 'round'}
		class:draggable
		style:--pos-x={positionX} style:--pos-y={positionY}
		use:dragAction use:autoPosition={position}>
		<slot/>
	</a>
{:else}
	<div class='coverslip' class:active class:round={shape === 'round'}
		class:draggable
		style:--pos-x={positionX} style:--pos-y={positionY}
		use:dragAction use:autoPosition={position}>
		<slot/>
	</div>
{/if}

<style>
	.coverslip {
		width: calc(var(--st-slide-width) * 0.45);
		aspect-ratio: 1;
		background-color:
			var(--br-dark, rgba(255,255,255, 0.1))
			var(--br-light, rgba(0, 0, 0, 0.05));
			display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		border-radius: 2px;
		cursor: pointer;
		transform: translate(-50%, -50%);
		left: calc(var(--pos-x) * 100%);
		top: calc(var(--pos-y) * 100%);
	}
	div.coverslip.active {
		cursor: default;
	}
	:global(.slide-surface) .coverslip {
		position: absolute;
	}
	.coverslip.round {
		border-radius: 50%;
	}
	.coverslip.active {
		background-color: var(--br-dark, hsl(225deg 100% 60%))
			var(--br-light, hsl(225deg 100% 55%));
	}
	.coverslip.draggable {
		cursor: grab;
	}
	:global(.coverslip.dragging) {
		user-select: none;
		cursor: grabbing !important;
	}
</style>