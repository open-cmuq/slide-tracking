export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["fonts/Inter-SemiBold.woff","fonts/Inter-SemiBold.woff2","fonts/inter.css"]),
	mimeTypes: {".woff":"font/woff",".woff2":"font/woff2",".css":"text/css"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.f25eef68.js","imports":["_app/immutable/entry/start.f25eef68.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/singletons.d744cbe5.js","_app/immutable/chunks/parse.d12b0d5b.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.d6d09ca8.js","imports":["_app/immutable/entry/app.d6d09ca8.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.79e82b19.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js'),
			() => import('./nodes/12.js'),
			() => import('./nodes/13.js'),
			() => import('./nodes/14.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(logged-in)/api/v1/coverslips",
				pattern: /^\/api\/v1\/coverslips\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/(logged-in)/api/v1/coverslips/_server.js')
			},
			{
				id: "/(logged-in)/api/v1/experiments",
				pattern: /^\/api\/v1\/experiments\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/(logged-in)/api/v1/experiments/_server.js')
			},
			{
				id: "/(logged-in)/api/v1/files/download",
				pattern: /^\/api\/v1\/files\/download\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/(logged-in)/api/v1/files/download/_server.js')
			},
			{
				id: "/(logged-in)/api/v1/projects",
				pattern: /^\/api\/v1\/projects\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/(logged-in)/api/v1/projects/_server.js')
			},
			{
				id: "/(logged-in)/coverslip/[coverslipId]",
				pattern: /^\/coverslip\/([^/]+?)\/?$/,
				params: [{"name":"coverslipId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3], errors: [1,,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(logged-in)/coverslip/[coverslipId]/files",
				pattern: /^\/coverslip\/([^/]+?)\/files\/?$/,
				params: [{"name":"coverslipId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3], errors: [1,,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(logged-in)/coverslip/[coverslipId]/staining",
				pattern: /^\/coverslip\/([^/]+?)\/staining\/?$/,
				params: [{"name":"coverslipId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3], errors: [1,,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(logged-in)/experiments",
				pattern: /^\/experiments\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(logged-in)/experiment/[experimentId]",
				pattern: /^\/experiment\/([^/]+?)\/?$/,
				params: [{"name":"experimentId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(logged-in)/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(logged-in)/project/[projectId]",
				pattern: /^\/project\/([^/]+?)\/?$/,
				params: [{"name":"projectId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(logged-in)/slides",
				pattern: /^\/slides\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/(logged-in)/slide/[slideId]",
				pattern: /^\/slide\/([^/]+?)\/?$/,
				params: [{"name":"slideId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(logged-in)/slide/[slideId]/table",
				pattern: /^\/slide\/([^/]+?)\/table\/?$/,
				params: [{"name":"slideId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 13 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
