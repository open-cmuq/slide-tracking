<script>
	import { DropMenu, LinkItem } from '$lib/components';
	import { page } from '$app/stores';

	$: ({ breadcrumbs } = $page.data);
	$: middleBreadcrumbs = breadcrumbs.slice(1, breadcrumbs.length - 1);

	/**
     * @param {import("$types").Breadcrumb} breadcrumb
     */
	function href(breadcrumb) {
		switch (breadcrumb.type) {
			case 'project':
				return `/project/${breadcrumb.id}`;
			case 'experiment':
				return `/experiment/${breadcrumb.id}`;
			case 'slide':
				return `/slide/${breadcrumb.id}`;
			case 'coverslip':
				return `/coverslip/${breadcrumb.id}`;
			default:
				return '';
		}
	}
</script>

<DropMenu icon='dots-horizontal'>
	{#each middleBreadcrumbs as breadcrumb}
		<LinkItem href={href(breadcrumb)}>
			{breadcrumb.title}
		</LinkItem>
	{/each}
</DropMenu>