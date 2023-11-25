import { persistable } from '$lib/persistable/persistable.ts';

import LocalStorageBox from '$lib/storage/localStorageBox.ts';

const storage = new LocalStorageBox('persistable');

export const store = persistable<number>(storage, 0);
