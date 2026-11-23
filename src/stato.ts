// Stato del plugin: serve a controllare che OpenCode carichi SpecCheck.

export const VERSIONE = "0.0.0";

export interface Stato {
  readonly versione: string;
  readonly cartella: string;
}

export function descriviStato(stato: Stato): string {
  return `SpecCheck ${stato.versione} attivo in ${stato.cartella}`;
}
