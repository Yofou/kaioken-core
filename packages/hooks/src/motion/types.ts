export interface Task {
	abort(): void;
	promise: Promise<void>;
}

export interface SpringUpdateOpts {
	hard?: any;
	soft?: string | number | boolean;
}

export interface SpringOpts extends SpringUpdateOpts {
	stiffness: number;
	damping: number;
	precision: number;
}

export interface TickContext {
	inv_mass: number;
	dt: number;
	opts: SpringOpts;
	settled: boolean;
}

export type Updater<T> = (target_value: T, value: T) => T;

export interface TweenedOptions<T> {
	delay?: number;
	duration?: number | ((from: T, to: T) => number);
	easing?: (t: number) => number;
	interpolate?: (a: T, b: T) => (t: number) => T;
}
