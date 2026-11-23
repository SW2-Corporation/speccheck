# SpecCheck

SpecCheck è un'estensione di OpenCode che controlla la coincidenza tra i casi d'uso e i documenti di OpenSpec (`proposal.md`, `design.md`), prima che si passi all'implementazione.
È il prodotto di SW2 Corporation per il capitolato C9 di Zucchetti S.p.A., progetto didattico di Ingegneria del Software 2026/27, Università degli Studi di Padova.

Questo repository contiene per ora l'ambiente di sviluppo del Proof of Concept e un plugin di prova.

## Strumenti e versioni

Le versioni sono fissate in `package.json` e `package-lock.json`. `npm ci` installa esattamente queste.

| Strumento | Uso | Versione |
|---|---|---|
| Node.js | Esecuzione di strumenti, test e OpenSpec | 26 (LTS) |
| npm | Installazione delle dipendenze | quella di Node.js 26 |
| OpenCode (`@opencode/cli`) | Agente di harness che carica il plugin | 2.3.2 |
| `@opencode/plugin` | Interfacce per scrivere plugin di OpenCode 2 | 2.3.2 |
| OpenSpec (`@fission-ai/openspec`) | Sistema di specifiche con cui SpecCheck si integra, usato nei progetti di prova | 2.1.1 |
| TypeScript | Linguaggio del plugin, controllo dei tipi | 7.0.2 |
| `@types/node` | Tipi di Node.js per TypeScript | 26.6.6 |

## Requisiti

- Git.
- Node.js 26:
  - Windows: `winget install --id OpenJS.NodeJS.LTS`;
  - Linux e macOS: il gestore di pacchetti del sistema oppure [nodejs.org](https://nodejs.org).

Non serve installare OpenCode né OpenSpec a parte: stanno tra le dipendenze del repository.

## Installazione

```sh
git clone <indirizzo del repository>
cd speccheck
npm ci
npx opencode --version
```

`npm ci` esegue il postinstall di `@opencode/cli`, che copia il binario di OpenCode per il proprio sistema. npm 12 esegue solo gli script elencati in `allowScripts` di `package.json`; quello di `@opencode/cli@2.3.2` è già approvato. Se si cambia la versione di OpenCode, si approva di nuovo lo script con `npm install-scripts approve @opencode/cli`.

`.npmrc` contiene `engine-strict=true`: con un Node.js diverso dal 26 `npm ci` si ferma. L'ultimo comando deve stampare `opencode v2.3.2`.

## Avvio

```sh
npm run opencode
```

Lo script avvia OpenCode con `--standalone`. Così si usa il binario fissato in questo repository, con un server privato. Senza `--standalone` OpenCode si collega al servizio in background, che può essere di un'altra versione installata nel sistema.

Il modello lo sceglie ciascuno in OpenCode. Per sviluppo e test si usano i modelli gratuiti di OpenCode o modelli open-weight in locale (decisione VE-2026-11-17.5).

### OpenSpec

OpenSpec è il sistema di specifiche con cui SpecCheck si integra (decisione VE-2026-11-17.2). Non è il modo in cui il gruppo sviluppa SpecCheck. La CLI serve a creare e leggere le change dei progetti di prova in `esempi/` (decisione VE-2026-11-17.7):

```sh
npm run openspec -- list
npm run openspec -- show <change>
```

### Telemetria di OpenSpec

OpenSpec invia a PostHog statistiche d'uso anonime, legate a un identificativo casuale. Per disattivarle una volta per tutte: `npm run openspec -- config set telemetry.enabled false`. In alternativa si imposta la variabile `OPENSPEC_TELEMETRY=0` (vale anche `DO_NOT_TRACK=1`):
- fish: `set -Ux OPENSPEC_TELEMETRY 0`;
- bash e zsh: `export OPENSPEC_TELEMETRY=0` nel file di avvio della shell;
- Windows (PowerShell): `[Environment]::SetEnvironmentVariable("OPENSPEC_TELEMETRY", "0", "User")`, poi si riapre il terminale.

## Struttura

```
.github/                   workflow Verifica, modelli di issue e pull request
.opencode/plugins/         plugin del progetto caricati da OpenCode
  speccheck/index.ts       punto di ingresso del plugin, rimanda a src/
src/                       codice del plugin
test/                      test con il runner di Node.js
.npmrc                     engine-strict: solo Node.js 26
package.json               dipendenze fissate e script
tsconfig.json              opzioni di TypeScript
LICENSE                    licenza MIT
```

I progetti di prova arrivano in `esempi/` con la issue del progetto di prova.

## Comandi

| Comando | Cosa fa |
|---|---|
| `npm run tipi` | controlla i tipi con `tsc --noEmit` |
| `npm test` | esegue i test di `test/` con `node --test` |
| `npm run verifica` | tipi e test, come il workflow `Verifica` |
| `npm run opencode` | avvia OpenCode con il binario fissato |
| `npm run openspec -- <comando>` | esegue la CLI di OpenSpec |

Node.js 26 esegue i file `.ts` togliendo i tipi. Per questo il codice usa solo sintassi cancellabile (niente `enum` né `namespace`) e gli import locali con l'estensione `.ts`. `tsconfig.json` lo controlla con `erasableSyntaxOnly`.

## Controllo del plugin di prova

OpenCode carica i plugin di una cartella alla prima richiesta, e quella richiesta riceve la risposta prima della fine del caricamento. Per questo `opencode plugin list` lanciato da solo riporta "No plugins found". Il controllo si fa con un server avviato:

1. In un terminale, dalla cartella del repository:
   ```sh
   npx opencode serve --hostname 127.0.0.1 --port 47124 --print-logs
   ```
   Il log stampa la riga `server password ...`.
2. In un altro terminale, con la password nella variabile `OPENCODE_PASSWORD`:
   ```sh
   npx opencode api --server http://127.0.0.1:47124 GET /api/plugin
   ```
   La prima chiamata avvia il caricamento e risponde con una lista vuota.
3. Dopo qualche secondo si ripete la chiamata. La risposta contiene il plugin `speccheck` con `"status":"active"`.
4. Si ferma il server con Ctrl+C.

Nessuna API elenca i tool. In una sessione di OpenCode si può chiedere all'agente di usare `speccheck_stato`, che risponde `SpecCheck <versione> attivo in <cartella>`.

## Licenza

MIT, vedi `LICENSE`.
