# SvelteKit MVP Starter

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

Basic parts of this starter:

- SvelteKit
- SvelteKitAuth (Auth.js)
  - KeyCloak already implemented
  - Included compose file to spin up KeyCloak locally
  - IBM AppID also already implemented
  - Credentials
- IBM Carbon Design
  - Components
  - Icons
  - Layout
  - Theme switch (light / dark mode)
- TailwindCSS for easier custom design
- Protected Routes
  - Protected API
  - Protected Paths and Components examples
- Health endpoints
- Notification System persisted in local storage
- Drizzle ORM
  - Zod extension for drizzle

## TL;DR

After cloning the repository run the `./run.sh` script.

- This will install the dependencies
- Ask you for all necessary environment variables
- Generate the database
- Starts the dev server.

## Developing

Once you've created a project and installed dependencies with `pnpm install` (or `npm install` or `yarn`), start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

### Development Container

Prefer the devcontainer for local development. [VS Code Docs](https://code.visualstudio.com/docs/devcontainers/containers).

**Hit:** If you cloned your repository over ssh you might add your private ssh key to the ssh-add agent.

```shell
# id_rsa = name of your private ssh key
ssh-add $HOME/.ssh/id_rsa
```

In case there are some issues with the _Authentication & Authorization_ see section [Running Production Build without HTTPS](#running-production-build-without-https) for bypassing switch to https.

## Authentication & Authorization

This project is using [Auth.js](https://authjs.dev) on the client side. Multiple authentication providers can be used. In this case KeyCloak and IBM AppID is already set up.

Choose the provider you want via the `.env` file with the necessary values.

If no KeyCloak Server is set up already, follow the steps below for OpenShift:

1. Install operator through the _Operator Hub_
2. Goto the installed operator
   1. Create an KeyCloak instance (this will take several minutes)
   2. Go the _Networking_ -> _Routes_ tab click on the link to the KeyCloak instance
3. Login on the KeyCloak UI with the credentials under _Workload_ -> _Secrets_ -> **credential-example-keycloak**

As an alternative you can use a local KeyCloak instance via `docker-compose`.
For setting it up, for local development, see instructions in the [./keycloak/README.md](./keycloak/README.md).
After this the steps below are the same.

### KeyCloak

1. Login to the KeyCloak Console
2. Create a new Realm
3. Create your needed Users
4. Create a new Client
   1. Add a client name and click save
   2. In the client _Settings_ under **Access Type** choose **confidential**
   3. Add `http://localhost:5173/*` as a valid redirect url
   4. Save changes
   5. The client secret can be found under _Installation_
5. Provide the values in the `.env` file

#### Demo Realm

This demo [keycloak/demoreal.json](./keycloak/demorealm.json) realm is for importing into a KeyCloak instance to get quickly started with development.

### Protected Routes

In SvelteKit we have a couple of choices to secure routes

#### Per Path

Here it is used to secure all routes under `/api` and is set up in the `hooks.server.ts` file.
The handle hook is a function that receives **ALL** requests sent to your SvelteKit webapp.
You may intercept them inside the handle hook, add and modify things in the request, block requests, etc.

Restricting certain URIs is better for many projects because of some benefits like:

- This automatically protects actions and api routes in those URIs
- No code duplication between components
- Very easy to modify

**Important:** All sub-directories of a protected path must include the `+page.server.ts` file. In case there is a link from a not protected route to a sub-route of a protected one (and this file is missing) the `hooks.server.ts` is not triggered, because of pre-rendering and client side navigation.
E.g.: linking from `/unprotected` to `/protected/should-be-protected`, in the `protected` and `/protected/should-be-protected` folder must be a `+page.server.ts` file.

#### Per Component

When using _per component_ authorization be aware of some architectural flaws mentioned in [this part of the documentation](https://authjs.dev/reference/sveltekit#per-component).

Despite this, this is the simplest way to protect pages.

A quick guid how to use this.

##### Protect only single a component

Put the logic in the +page.server.ts file:

```jsx
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) throw redirect(303, '/auth');
	return {};
};
```

##### Protect a components which are using layouts

For the `+layout.server.ts` use:

```jsx
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await event.locals.getSession()
	};
};
```

and the `+page.server.ts`

```jsx
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (!session?.user) throw redirect(303, '/');
	return { session };
};
```

## Building

For specific build information see the official [docs](https://kit.svelte.dev/docs/building-your-app) and especially the
[node build docs](https://kit.svelte.dev/docs/adapter-node) for which this starter is meant for.

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
> Note that the ports differ:
>
> - Preview port 4173
> - Production port 3000
>
> Ports can be overwritten

### Docker Build

For a production build use the provided docker file

```shell
docker build -t <image-name> .
```

### Running Production Build without HTTPS

If you try to run the production build locally or on docker and need to skip the HTTPS protocol, you need to the the `ORIGIN` environment variable.

```shell
# When serving the build
export ORIGIN=http://localhost:5173 PORT=5173 node build

# When running the docker container
# Change the .env file according to the comments there
docker run -p 5173:5173 --rm --env-file .env --name <image-name> <image-name>
```
