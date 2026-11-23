# Design

## Context

Vedi proposal.md, Why. L'applicazione è una pagina web senza server: la lista sta nel browser.

## Goals / Non-Goals

**Goals:**
- Lista utilizzabile da telefono, anche senza rete.

**Non-Goals:**
- Account utente.

## Decisions

- **Memorizzazione in `localStorage`**: la lista è un array di oggetti `{ nome, acquistato }`. Alternativa scartata: IndexedDB, troppo complesso per pochi dati.
- **Spunta di un prodotto**: quando l'utente segna un prodotto come acquistato, il sistema lo toglie dalla lista. Così la lista mostra solo quello che manca.
- **Condivisione**: il link contiene la lista codificata in base64 nel frammento dell'indirizzo.

## Risks / Trade-offs

- [Il browser cancella `localStorage`] → la lista si perde; accettabile per una lista della spesa.
