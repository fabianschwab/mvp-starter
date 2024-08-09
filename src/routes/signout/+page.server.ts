import { signOut } from "$lib/server/authConfig";
import type { Actions } from "./$types"
export const actions: Actions = { default: signOut }
