export type UnwrapContext<T extends Kaioken.Context<any>> = NonNullable<
  ReturnType<T["default"]>
>
