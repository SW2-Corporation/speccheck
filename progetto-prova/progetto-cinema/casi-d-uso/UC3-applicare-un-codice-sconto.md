# UC3 Applicare un codice sconto

## Diagramma

```mermaid
usecase-beta
direction LR
actor Spettatore
systemBoundary "Sistema Cinema"
  UC1("UC1 Acquistare un biglietto")
  UC3("UC3 Applicare un codice sconto")
end
Spettatore -- UC3
UC3 ..> : extend UC1
note for UC3 "Condizione: lo Spettatore chiede di inserire un codice sconto"
note for UC1 "Punto di estensione: richiesta sconto (passo 5)"
```

## Descrizione

- Attore principale: Spettatore.
- Attori secondari: Nessuno.
- Precondizioni: lo Spettatore sta eseguendo UC1 Acquistare un biglietto e il sistema ha calcolato il prezzo base.
- Postcondizioni: l'importo totale del biglietto risulta ridotto della percentuale prevista dal codice sconto.

## Scenario principale

1. Lo Spettatore chiede di inserire un codice sconto.
2. Il sistema richiede il codice alfanumerico.
3. Lo Spettatore inserisce il codice sconto.
4. Il sistema verifica che il codice sconto sia valido e non scaduto.
5. Il sistema ricalcola l'importo totale applicando la riduzione al prezzo base.
6. Il sistema comunica allo Spettatore il nuovo importo totale.

## Scenari alternativi

- **4a.** Se il codice sconto non è valido o è scaduto, il sistema comunica allo Spettatore che il codice sconto non è applicabile e mantiene il prezzo base. Il caso d'uso termina senza riduzione di prezzo.

## Relazioni

- Estende UC1 Acquistare un biglietto, nel punto di estensione «richiesta sconto» (passo 5), se lo Spettatore chiede di inserire un codice sconto.

## Termini

- **Spettatore**: Utente che acquista biglietti per assistere alle proiezioni.
- **Codice sconto**: stringa alfanumerica promozionale associata a una riduzione percentuale e a una data di scadenza.
- **Prezzo base**: tariffa standard del biglietto prima di eventuali riduzioni.
- **Importo totale**: somma finale da pagare dopo l'eventuale applicazione di un codice sconto.
