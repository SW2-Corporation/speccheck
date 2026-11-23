# Discrepanze note

Discrepanze inserite apposta nel change `gestione-lista` rispetto ai casi d'uso. SpecCheck deve segnalarle tutte.

| Codice | Tipo | Caso d'uso | File | Descrizione |
|---|---|---|---|---|
| D1 | caso d'uso mancante | UC3 | `proposal.md`, `design.md` | lo svuotamento della lista non compare in nessuno dei due file |
| D2 | comportamento diverso | UC2 | `design.md` | il design toglie dalla lista il prodotto acquistato; UC2 lo lascia nella lista, barrato |
| D3 | contenuto senza caso d'uso | nessuno | `proposal.md`, `design.md` | la condivisione della lista con un link non ha un caso d'uso |

Coincidenze attese, che SpecCheck non deve segnalare:
- UC1 è coperto da `proposal.md` (What Changes) e dalla spec `lista-spesa`;
- le estensioni 2a e 2b di UC1 mancano dalla spec ma non dal tema del change. È un caso limite: va deciso se contano come discrepanza.
