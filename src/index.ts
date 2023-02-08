// Decrement adapted from https://stackoverflow.com/a/73555039/4884772
type Arr<
	N extends number,
	T extends readonly unknown[] = readonly [],
> = T["length"] extends N ? T : Arr<N, readonly [...T, unknown]>;
type Decrement<N extends number> = Arr<N> extends readonly [unknown, ...infer U]
	? U["length"]
	: never;

export type Tensor0D = number;
export type Tensor1D<A extends number | null> = A extends 0
	? readonly []
	: A extends number
	? readonly [Tensor0D, ...Tensor1D<Decrement<A>>]
	: readonly Tensor0D[];
export type Tensor2D<
	A extends number | null,
	B extends number | null,
> = A extends 0
	? readonly []
	: A extends number
	? readonly [Tensor1D<B>, ...Tensor2D<Decrement<A>, B>]
	: readonly Tensor1D<B>[];
export type Tensor3D<
	A extends number | null,
	B extends number | null,
	C extends number | null,
> = A extends 0
	? readonly []
	: A extends number
	? readonly [Tensor2D<B, C>, ...Tensor3D<Decrement<A>, B, C>]
	: readonly Tensor2D<B, C>[];
export type Tensor4D<
	A extends number | null,
	B extends number | null,
	C extends number | null,
	D extends number | null,
> = A extends 0
	? readonly []
	: A extends number
	? readonly [Tensor3D<B, C, D>, ...Tensor4D<Decrement<A>, B, C, D>]
	: readonly Tensor3D<B, C, D>[];

type Tensor<
	A extends number | null = null,
	B extends number | null = null,
	C extends number | null = null,
	D extends number | null = null,
> =
	| Tensor0D
	| Tensor1D<A>
	| Tensor2D<A, B>
	| Tensor3D<A, B, C>
	| Tensor4D<A, B, C, D>;

const t: Tensor0D = 1;
const tStar: Tensor1D<null> = [1, 2, 3];
const t0: Tensor1D<0> = [];
const t1: Tensor1D<1> = [1];
const t2: Tensor1D<2> = [1, 2];
const t4_star: Tensor2D<4, null> = [[], [], [], [1]]; // TODO: Improve star somehow?
const tStar_4: Tensor2D<null, 4> = [
	[1, 2, 3, 4],
	[5, 6, 7, 8],
];
const t0_4: Tensor2D<0, 4> = [];
const t1_3: Tensor2D<1, 3> = [[1, 2, 3]];
const t3_2: Tensor2D<3, 2> = [
	[1, 2],
	[3, 4],
	[5, 6],
];
const t2_3_4: Tensor3D<2, 3, 4> = [
	[
		[1, 2, 3, 4],
		[5, 6, 7, 8],
		[9, 0, 1, 2],
	],
	[
		[3, 4, 5, 6],
		[7, 8, 9, 0],
		[1, 2, 3, 4],
	],
];

const ttt: Tensor = t2_3_4;

console.log(
	t,
	tStar,
	t0,
	t1,
	t2,
	t0_4,
	t1_3,
	t3_2,
	t2_3_4,
	t4_star,
	tStar_4,
	ttt,
);
