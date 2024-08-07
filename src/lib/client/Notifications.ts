import { writable } from 'svelte/store';

export const toasts = writable<{ id: string; props: Toast }[]>([]);

export const addToast = (toast: Toast) => {
	const id = self.crypto.randomUUID();

	// Push the toast to the top of the list of toasts
	toasts.update((all) => [{ id, props: toast }, ...all]);

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: string) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};

export type Toast = {
	kind?: ToastKind;
	lowContrast?: boolean;
	timeout?: number;
	role?: string;
	title?: string;
	subtitle?: string;
	caption?: string;
	statusIconDescription?: string;
	closeButtonDescription?: string;
	hideCloseButton?: boolean;
	fullWidth?: boolean;
};

export enum ToastKind {
	Error = 'error',
	Info = 'info',
	InfoSquare = 'info-square',
	Success = 'success',
	Warning = 'warning',
	WarningAlt = 'warning-alt'
}
