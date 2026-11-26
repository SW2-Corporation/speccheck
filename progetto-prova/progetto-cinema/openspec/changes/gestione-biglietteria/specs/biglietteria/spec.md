# Specifiche Modulo Biglietteria

## ADDED Requirements

### Requirement: Autenticazione Utente
Il sistema SHALL richiedere all'Utente l'inserimento di indirizzo email e password e avviare una sessione attiva solo se le credenziali corrispondono a un account registrato.

#### Scenario: Login con credenziali valide
- **WHEN** l'Utente inserisce indirizzo email e password corrispondenti a un account registrato
- **THEN** il sistema avvia una sessione attiva per l'Utente

#### Scenario: Login con credenziali non valide
- **WHEN** l'Utente inserisce credenziali non corrispondenti ad alcun account registrato
- **THEN** il sistema comunica che le credenziali non sono valide e richiede nuovamente i dati

### Requirement: Consultazione Proiezioni e Poltrone
Il sistema SHALL mostrare allo Spettatore autenticato l'elenco delle proiezioni programmate indicando il numero di poltrone libere per ciascuna proiezione.

#### Scenario: Visualizzazione proiezioni disponibili
- **WHEN** lo Spettatore autenticato avvia l'acquisto di un biglietto
- **THEN** il sistema elenca le proiezioni programmate con il relativo numero di poltrone libere

### Requirement: Selezione Poltrona e Prezzo Base
Il sistema SHALL permettere allo Spettatore di selezionare una poltrona libera per una proiezione e SHALL calcolare il prezzo base del biglietto, impedendo la selezione se la poltrona risulta già occupata.

#### Scenario: Selezione di una poltrona libera
- **WHEN** lo Spettatore sceglie una proiezione e una poltrona libera
- **THEN** il sistema calcola il prezzo base del biglietto

#### Scenario: Selezione di una poltrona già occupata
- **WHEN** lo Spettatore seleziona una poltrona non più libera
- **THEN** il sistema comunica che la poltrona non è disponibile e consente una nuova scelta

### Requirement: Pagamento ed Emissione Biglietto
Il sistema SHALL inviare la richiesta di addebito dell'importo totale al Gateway di pagamento e SHALL registrare il biglietto e inviare il relativo codice via SMS al numero di telefono dello Spettatore esclusivamente dopo la conferma positiva del pagamento.

#### Scenario: Pagamento approvato dal gateway
- **WHEN** lo Spettatore conferma l'acquisto e il Gateway di pagamento conferma l'addebito
- **THEN** il sistema registra il biglietto per la poltrona scelta e invia il codice del biglietto via SMS allo Spettatore

#### Scenario: Pagamento rifiutato dal gateway
- **WHEN** il Gateway di pagamento rifiuta l'addebito
- **THEN** il sistema comunica allo Spettatore che il pagamento non è riuscito e termina senza emettere il biglietto

### Requirement: Annullamento Biglietto
Il sistema SHALL permettere allo Spettatore autenticato di annullare un biglietto acquistato fino a 2 ore prima dell'orario di inizio della proiezione, liberando la poltrona e avviando il rimborso tramite il Gateway di pagamento.

#### Scenario: Annullamento entro il limite temporale
- **WHEN** lo Spettatore richiede l'annullamento almeno 2 ore prima della proiezione
- **THEN** il sistema invalida il biglietto, rende nuovamente libera la poltrona e richiede il rimborso al Gateway di pagamento

#### Scenario: Annullamento fuori tempo massimo
- **WHEN** lo Spettatore richiede l'annullamento a meno di 2 ore dall'inizio della proiezione
- **THEN** il sistema rifiuta l'annullamento e mantiene valido il biglietto