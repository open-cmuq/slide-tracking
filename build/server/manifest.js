const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["fonts/Inter-SemiBold.woff","fonts/Inter-SemiBold.woff2","fonts/inter.css"]),
	mimeTypes: {".woff":"font/woff",".woff2":"font/woff2",".css":"text/css"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.f25eef68.js","imports":["_app/immutable/entry/start.f25eef68.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/singletons.d744cbe5.js","_app/immutable/chunks/parse.d12b0d5b.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.d6d09ca8.js","imports":["_app/immutable/entry/app.d6d09ca8.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.79e82b19.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-4f7579ea.js'),
			() => import('./chunks/1-2d38d4c4.js'),
			() => import('./chunks/2-5f310282.js'),
			() => import('./chunks/3-db8d487b.js'),
			() => import('./chunks/4-9ac61c86.js'),
			() => import('./chunks/5-8545c238.js'),
			() => import('./chunks/6-3db4466a.js'),
			() => import('./chunks/7-df290d80.js'),
			() => import('./chunks/8-fba065e1.js'),
			() => import('./chunks/9-f5bb7bf1.js'),
			() => import('./chunks/10-898c6b0e.js'),
			() => import('./chunks/11-6f64b151.js'),
			() => import('./chunks/12-ef9c4930.js'),
			() => import('./chunks/13-a4aaad70.js'),
			() => import('./chunks/14-4655318c.js')
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
				endpoint: () => import('./chunks/_server-86ea793b.js')
			},
			{
				id: "/(logged-in)/api/v1/experiments",
				pattern: /^\/api\/v1\/experiments\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server-d7e4ffbe.js')
			},
			{
				id: "/(logged-in)/api/v1/files/download",
				pattern: /^\/api\/v1\/files\/download\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server-39aa9ab0.js')
			},
			{
				id: "/(logged-in)/api/v1/projects",
				pattern: /^\/api\/v1\/projects\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server-90f136f6.js')
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

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
