# SvelteKit MVP Starter

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

Basic parts of this starter:

- SvelteKit
- SvelteKitAuth
- Carbon Design Components
- Carbon Design Icons
- Base Layout
- OpenShift Operator
- Env Variables
- Protected API
- Protected Paths and Components examples

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Authentication & Authorization

This project is using [Auth.js](https://authjs.dev) on the client side. Multiple authentication providers can be used. In this case KeyCloak is predefined.

If no KeyCloak is set up already follow the steps below for OpenShift:

1. Install operator through the *Operator Hub*
2. Goto the installed operator
   1. Create an KeyCloak instance (this will take several minutes)
   2. Go the *Networking* -> *Routes* tab click on the link to the KeyCloak instance
3. Login on the KeyCloak UI with the credentials under *Workload* -> *Secrets* -> **credential-example-keycloak**

### KeyCloak

1. Login to the KeyCloak Console
2. Create a new Realm
3. Create your needed Users
4. Create a new Client
   1. Add a client name and click save
   2. In the client *Settings* under **Access Type** choose **confidential**
   3. Add `http://localhost/*` as a valid redirect url
   4. Save changes
   5. The client secret can be found under *Installation*
5. Provide the values in the `.env` file

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

#### Per Component

When using *per component* authorization be aware of some architectural flaws mentioned in [this part of the documentation](https://authjs.dev/reference/sveltekit#per-component).

Despite this, this is the simplest way to protect pages.

A quick guid how to use this.

##### Protect only single a component

Put the logic in the +page.server.ts file:

```jsx
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.getSession()
  if (!session?.user) throw redirect(303, "/auth")
  return {}
}
```

##### Protect a components which are using layouts

For the `+layout.server.ts` use:

```jsx
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.getSession()
  }
}
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

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
