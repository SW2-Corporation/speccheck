# Spec Delta

## Purpose

La capacità permette di compilare la lista della spesa e di spuntare i prodotti acquistati.

## ADDED Requirements

### Requirement: Aggiunta di un prodotto
Il sistema SHALL aggiungere il prodotto in fondo alla lista, non acquistato.

#### Scenario: Prodotto nuovo
- **WHEN** l'utente scrive un nome non vuoto e conferma
- **THEN** il prodotto compare in fondo alla lista, non acquistato

### Requirement: Spunta di un prodotto
Il sistema SHALL permettere di segnare un prodotto come acquistato.

#### Scenario: Prodotto acquistato
- **WHEN** l'utente sceglie un prodotto non acquistato
- **THEN** il prodotto risulta acquistato
