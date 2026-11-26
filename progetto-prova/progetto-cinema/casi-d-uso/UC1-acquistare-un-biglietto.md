# UC1 Acquistare un biglietto

## Diagramma

```mermaid
usecase-beta
direction LR
actor Spettatore
actor Utente
actor GatewayPagamento("Gateway di pagamento")
actor ServizioPosta("Servizio di posta del cinema")
systemBoundary "Sistema Cinema"
  UC1("UC1 Acquistare un biglietto")
  UC2("UC2 Autenticarsi")
  UC3("UC3 Applicare un codice sconto")
end
Spettatore --|> Utente
Spettatore -- UC1
UC1 -- GatewayPagamento
UC1 -- ServizioPosta
Utente -- UC2
UC1 ..> : include UC2
UC3 ..> : extend UC1
note for UC3 "Condizione: lo Spettatore chiede di inserire un codice sconto"
note for UC1 "Punto di estensione: richiesta sconto (passo 5)"
```

## Descrizione

- Attore principale: Spettatore.
- Attori secondari: Gateway di pagamento, Servizio di posta del cinema.
- Precondizioni: lo Spettatore è registrato nel sistema; esiste almeno una proiezione programmata.
- Postcondizioni: esiste un biglietto emesso per lo Spettatore associato a una poltrona e a una proiezione; il Gateway di pagamento ha confermato l'addebito dell'importo totale; il Servizio di posta del cinema ha ricevuto la richiesta di inviare il biglietto via email allo Spettatore.

## Scenario principale

1. Lo Spettatore chiede di acquistare un biglietto.
2. Lo Spettatore si autentica con UC2 Autenticarsi.
3. Il sistema elenca le proiezioni programmate con il relativo numero di poltrone libere.
4. Lo Spettatore sceglie una proiezione e una poltrona libera.
5. Il sistema calcola il prezzo base del biglietto. Punto di estensione «richiesta sconto».
6. Lo Spettatore conferma l'acquisto del biglietto.
7. Il sistema invia al Gateway di pagamento la richiesta di addebito dell'importo totale.
8. Il Gateway di pagamento conferma l'addebito.
9. Il sistema registra il biglietto per la poltrona scelta e chiede al Servizio di posta del cinema di inviare il codice del biglietto via email allo Spettatore.

## Scenari alternativi

- **2a.** Se lo Spettatore non si autentica, il caso d'uso termina senza emissione del biglietto.
- **4a.** Se la poltrona scelta non è più libera, il sistema comunica allo Spettatore che la poltrona non è disponibile. Il caso d'uso riprende dal passo 4.
- **8a.** Se il Gateway di pagamento rifiuta l'addebito, il sistema comunica allo Spettatore che il pagamento non è riuscito. Il caso d'uso termina senza emissione del biglietto.

## Relazioni

- Include UC2 Autenticarsi, al passo 2.
- È esteso da UC3 Applicare un codice sconto, nel punto di estensione «richiesta sconto» (passo 5), se lo Spettatore chiede di inserire un codice sconto.
- Lo Spettatore è un Utente: generalizzazione tra attori. Per questo lo Spettatore esegue UC2 Autenticarsi, il cui attore principale è l'Utente.

## Termini

- **Utente**: persona registrata nel sistema.
- **Spettatore**: Utente che acquista biglietti per assistere alle proiezioni.
- **Gateway di pagamento**: servizio esterno che elabora gli addebiti elettronici.
- **Servizio di posta del cinema**: sistema esterno che invia messaggi di posta elettronica agli Spettatori.
- **Proiezione**: spettacolo di un film programmato in una sala, in una data e in un orario specifici.
- **Poltrona**: singolo posto a sedere numerato all'interno di una sala cinematografica.
- **Poltrona libera**: poltrona di una sala che non risulta associata ad alcun biglietto per una determinata proiezione.
- **Biglietto**: titolo di accesso nominativo emesso per uno Spettatore, valido per una poltrona e una proiezione.
- **Prezzo base**: tariffa standard del biglietto prima di eventuali riduzioni.
- **Importo totale**: somma finale da pagare dopo l'eventuale applicazione di un codice sconto.