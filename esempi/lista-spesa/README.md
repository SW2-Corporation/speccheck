# Esempio: lista della spesa

Progetto di prova minimo, inventato, per mostrare la forma dei progetti di prova di SpecCheck (decisione VE-2026-11-17.7). Non è il progetto di prova del PoC.

```
casi-d-uso/       la pre-proposta: diagramma in Mermaid e un file Markdown per caso d'uso
openspec/         progetto OpenSpec, creato con openspec init --tools none
  changes/gestione-lista/
    proposal.md   proposta, con discrepanze rispetto ai casi d'uso
    design.md     design, con discrepanze rispetto ai casi d'uso
    tasks.md      compiti: SpecCheck non li controlla
    specs/        requisiti del change
discrepanze.md    elenco delle discrepanze note, cioè il risultato atteso
```

Il formato dei casi d'uso è provvisorio: lo fissa il modello della decisione VE-2026-11-17.3.

I requisiti di OpenSpec devono contenere SHALL o MUST: con `--strict` la validazione lo richiede. Per questo i requisiti sono in italiano con la parola chiave SHALL.

Controllo del change, dalla radice del repository:

```sh
cd esempi/lista-spesa
npx openspec validate gestione-lista --strict
```
