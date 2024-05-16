<script>
    import '@kwangure/strawberry/default/item';
    import { Arrow, Dropdown, Popup } from '@kwangure/strawberry/default/dropdown';
    import { ButtonItem, MdiIcon } from '$lib/components';
    import { mdiChevronDoubleLeft, mdiMicroscope, mdiPlus, mdiQrcodeScan } from '@mdi/js';
    import { signIn, signOut } from '@auth/sveltekit/client';
    import { mdiGoogle } from '$lib/mdijs';
    // import { Dialog } from '@kwangure/strawberry/default/dialog';
    import { page } from '$app/stores';
    import Cameradialog from './cameradialog.svelte';


    $: user = $page.data.user;

    // let show;
    // let showModal;
    // let dialog;
    const show = false;
    let close;

    let showDialog = false;

    function closeDialog() {
    	showDialog = false;
    }

</script>

<Cameradialog bind:show={showDialog} close={closeDialog} />



<nav>
	<a class="logo" href="/">
		<MdiIcon d={mdiMicroscope}/>
		<div class="word-mark">
			Slide Tracking
		</div>
	</a>
	<div class="actions">
        {#if user}
            <Dropdown>
                <button on:click={() => showDialog = true} >
                    <MdiIcon d={mdiQrcodeScan}/>
                    Scan QR Code
                </button>
                <div slot='trigger' class='br-list-item'>
                    {user.name}
                </div>
                <Popup>
                    <Arrow/>
                    <ButtonItem on:click={signOut}>
                        Sign Out
                    </ButtonItem>
                </Popup>
            </Dropdown>
        {:else}
            <button on:click={() => signIn('google')} class='br-button-primary'>
                <MdiIcon d={mdiGoogle}/>
                Sign in with Google
            </button>
        {/if}
	</div>
</nav>

<style>
	nav {
        display: flex;
        align-items: center;
        height: var(--br-size-12);
        padding-inline: var(--viewport-margin);
        border-bottom: var(--br-global-border);
    }
    .logo {
        font-family: 'Inter', var(--br-font-family);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--br-size-3);
    }
    .dial {
        z-index: 20;
    }
    .word-mark {
        font-size: var(--br-size-5);
        font-weight: 600;
        letter-spacing: -0.025em;
        margin-top: var(--br-size-2);
    }
    .logo {
        --icon-size: var(--br-size-7);
        height: var(--br-size-7);
    }
    .actions {
        margin-left: auto;
        display: flex;
        gap: var(--br-size-3);
    }
    div[slot=content] {
        margin-top: 10px;
    }
    .dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dialog {
        background: white;
        padding: 20px;
        border-radius: 8px;
    }
</style>