import type { Breadcrumb } from "$types";
import type { Session } from "@auth/core/types";
import type { User } from "@prisma/client";

/** @link {https://kit.svelte.dev/docs/types#app} */
declare global {
	namespace App {
		interface Locals {
			session?: Session,
			user: User;
		}
		interface PageData {
			user?: User;
			breadcrumbs: Breadcrumb[]
		}
	}
}

export {};
