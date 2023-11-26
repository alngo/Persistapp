import { persistable } from '$lib/persistable/persistable.ts';

import SessionStorageBox from '$lib/storage/sessionStorage/sessionStorageBox.ts';

const storage = new SessionStorageBox('persistable');

export const store = persistable<number>(storage, 0);
