import type { Coverslip, CoverslipFile, Experiment, Project, Slide, Staining, StainingField } from "@prisma/client";
import { extendedCoverslip } from '$lib/schemas/query';
import type { z } from "zod";

export type BreadcrumbRoot = {
	type: 'root';
	name: 'shared' | 'own';
	title: string;
};

export type DataItem = Project
	| Experiment
	| Slide

export type Breadcrumb = BreadcrumbRoot
	| BreadcrumbProject
	| BreadcrumbExperiment
	| BreadcrumbSlide
	| BreadcrumbCoverslip

export type BreadcrumbProject = Project & {
	type: 'project',
}
export type BreadcrumbExperiment = Experiment & {
	type: 'experiment',
}
export type BreadcrumbSlide = Slide & {
	type: 'slide',
}
export type BreadcrumbCoverslip = Coverslip & {
	title: string;
	type: 'coverslip',
}

export type ProjectPrompt = (op: 'create' | 'edit', project?: Partial<Project>) => any;
export type ExperimentPrompt = (op: 'create' | 'edit', experiment?: Partial<Experiment>) => any;
export type SlidePrompt = (op: 'create' | 'edit', slide?: Partial<Slide>) => any;
export type StainingWithFields = Staining & { fields: StainingField[]; };
export type Prompt = {
	project: ProjectPrompt;
	experiment: ExperimentPrompt;
	slide: SlidePrompt;
	createCoverslip: (slideId: string) => any;
	createStaining: (coverslipId: string) => any;
	editCoverslip: (coverslip: Coverslip) => any;
	editCoverslips: (coverslipids: String[], slideid: String) => any;
	editCoverslip2: (coverslip: Coverslip) => any;
	editStaining: (staining: StainingWithFields) => void;
	deleteCoverslip: (coverslip: Coverslip) => void;
	deleteExperiment: (experiment: Experiment) => void;
	deleteProject: (project: Project) => void;
	deleteSlide: (slide: Slide) => void;
	deleteFile: (slide: CoverslipFile) => void;
	deleteStaining: (slide: Staining) => void;
	uploadCoverslipFiles: (coverslipId: string) => any;
}
