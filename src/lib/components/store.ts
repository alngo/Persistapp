import { persistable } from '$lib/persistable';

export const store = persistable<number>(0);
