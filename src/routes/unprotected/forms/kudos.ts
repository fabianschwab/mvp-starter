import { persisted } from 'svelte-persisted-store';

export const kudos = persisted<Kudo[]>('kudos', []);

export type Kudo = {
	id: string;
	kind: KudoKind;
	from: string;
	to: string;
	message: string;
	date: Date;
};

export enum KudoKind {
	ThankYou = 'Thank you',
	Congrats = 'Congrats',
	TotallyAwesome = 'Totally awesome',
	GreatJob = 'Great job',
	WellDone = 'Well done'
}

export const addKudo = (kudo: Kudo) => {
	kudos.update((all) => [{ ...kudo }, ...all]);
};

export const removeKudo = (id: string) => {
	kudos.update((all) => all.filter((t) => t.id !== id));
};
