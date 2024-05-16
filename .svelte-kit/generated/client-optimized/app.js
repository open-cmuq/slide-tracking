export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14')
];

export const server_loads = [2,3];

export const dictionary = {
		"/": [~4],
		"/(logged-in)/coverslip/[coverslipId]": [5,[2,3]],
		"/(logged-in)/coverslip/[coverslipId]/files": [~6,[2,3]],
		"/(logged-in)/coverslip/[coverslipId]/staining": [~7,[2,3]],
		"/(logged-in)/experiments": [~9,[2]],
		"/(logged-in)/experiment/[experimentId]": [~8,[2]],
		"/(logged-in)/projects": [~11,[2]],
		"/(logged-in)/project/[projectId]": [~10,[2]],
		"/(logged-in)/slides": [~14,[2]],
		"/(logged-in)/slide/[slideId]": [~12,[2]],
		"/(logged-in)/slide/[slideId]/table": [~13,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';