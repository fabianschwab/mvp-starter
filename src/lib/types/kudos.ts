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
