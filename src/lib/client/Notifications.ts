import { persisted } from 'svelte-persisted-store';

export const toasts = persisted<{ id: string; props: Toast }[]>('toasts', []);

export const addToast = (toast: Toast) => {
	if (toast.hideCloseButton && !toast.timeout) {
		throw new Error('If you hide the close button, you need to set a timeout.');
	}

	const id = self.crypto.randomUUID();

	// Push the toast to the top of the list of toasts
	toasts.update((all) => [{ id, props: toast }, ...all]);

	// If toast is dismissible, dismiss it after "timeout" amount of time.
	if (toast.timeout) setTimeout(() => dismissToast(id), toast.timeout);
};

export const dismissToast = (id: string) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};

export const clearToasts = () => {
	toasts.set([]);
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
