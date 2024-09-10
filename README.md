# Welcome to Kaioken-Core

this is a mono repo that is built by kaioken enthusiasts that are aiming to build the kaioken eco system, by fulfilling the basic needs to build apps in kaioken! this is by no means the only place to start making kaioken libraries but we gotta start somewhere and I believe having the grounds works in one place will induce a endless quality.

## What we have

- [@kaioken-core/hooks](https://hooks.kaioken-core.dev/)
  All the hooks you need to build an interactive application

## What's on the roadmap

the plan is currently in this order, but it may change!

1. @kaioken-core/components
   a kaioken headless component library that helps you build accessible interactive components
2. @kaioken-core/motion
   a kaioken animation library that lets you build fluid animation with intuitive gesture api
3. @kaioken-core/sortable
   a kaioken library allowing you sort a list of elements/data smoothly

## How working in kaioken-core works.

The git branch structure is as follows.

`main` - this is the latest development branch, this is for the most part where you'll be branching off as someone looking to contribute to kaioken-core and merging back into (once approved of course).

`release` - this is where we merge `main` when we make releases of any kaioken-core packages. the standard procedure here is the following steps

1. merge `main` into `release`
2. run `pnpm release:{major,minor,patch}:{package}`, this will build, increase the package version & then publish to npm

the branch naming convention we use here (although is not enforced), is `{package}-{feat/bug}/{...rest}`
