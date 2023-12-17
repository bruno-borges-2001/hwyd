import { Notebook } from "@/types";
import { persistentAtom } from "@nanostores/persistent";

export const $notebooks = persistentAtom<Notebook[]>("notebooks", [], {
  encode: JSON.stringify,
  decode: JSON.parse
})