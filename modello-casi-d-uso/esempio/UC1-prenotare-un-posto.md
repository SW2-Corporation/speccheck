# UC1 Prenotare un posto

## Diagramma

```mermaid
usecase-beta
direction LR
actor Studente
actor Utente
actor ServizioPosta("Servizio di posta dell'ateneo")
systemBoundary "Aule studio"
  UC1("UC1 Prenotare un posto")
  UC2("UC2 Autenticarsi")
  UC3("UC3 Iscriversi alla lista d'attesa")
end
Studente --|> Utente
Studente -- UC1
UC1 -- ServizioPosta
Utente -- UC2
UC1 ..> : include UC2
UC3 ..> : extend UC1
note for UC3 "Condizione: lo Studente chiede di entrare nella lista d'attesa della fascia oraria"
note for UC1 "Punto di estensione: nessun posto libero (passo 5a)"
```

## Descrizione

- Attore principale: Studente.
- Attori secondari: Servizio di posta dell'ateneo.
- Precondizioni: lo Studente è registrato nel sistema.
- Postcondizioni: esiste una prenotazione dello Studente per un posto, in un'aula studio, una data e una fascia oraria; il Servizio di posta dell'ateneo ha ricevuto la richiesta di inviare allo Studente i dati della prenotazione.

## Scenario principale

1. Lo Studente chiede di prenotare un posto.
2. Lo Studente si autentica con UC2 Autenticarsi.
3. Il sistema elenca, per i sette giorni a partire dalla data corrente, le fasce orarie non ancora concluse di ogni aula studio con il numero di posti liberi.
4. Lo Studente sceglie un'aula studio, una data e una fascia oraria.
5. Il sistema verifica che la fascia oraria scelta abbia almeno un posto libero.
6. Il sistema registra una prenotazione dello Studente per un posto libero della fascia oraria scelta.
7. Il sistema comunica allo Studente i dati della prenotazione.
8. Il sistema chiede al Servizio di posta dell'ateneo di inviare allo Studente i dati della prenotazione.

## Scenari alternativi

- **2a.** Se lo Studente non si autentica, il caso d'uso termina senza prenotazione.
- **2b.** Se l'Utente autenticato non è uno Studente, il sistema comunica all'Utente che solo gli Studenti possono prenotare un posto. Il caso d'uso termina senza prenotazione.
- **4a.** Se lo Studente ha già una prenotazione nella stessa data e fascia oraria, il sistema comunica allo Studente che la prenotazione esiste già. Il caso d'uso riprende dal passo 4.
- **5a.** Se la fascia oraria scelta non ha posti liberi, il sistema comunica allo Studente che la fascia oraria non ha posti liberi. Punto di estensione «nessun posto libero». Il caso d'uso termina senza prenotazione.

## Relazioni

- Include UC2 Autenticarsi, al passo 2.
- È esteso da UC3 Iscriversi alla lista d'attesa, nel punto di estensione «nessun posto libero» (passo 5a), se lo Studente chiede di entrare nella lista d'attesa della fascia oraria.
- Lo Studente è un Utente: generalizzazione tra attori. Per questo lo Studente esegue UC2 Autenticarsi, il cui attore principale è l'Utente.

## Termini

- **Utente**: persona registrata nel sistema.
- **Studente**: Utente iscritto a un corso di studio dell'ateneo.
- **Servizio di posta dell'ateneo**: sistema esterno che invia messaggi di posta elettronica agli Utenti.
- **Aula studio**: locale dell'ateneo con un numero fisso di posti, prenotabili per fasce orarie.
- **Fascia oraria**: intervallo di una data in cui si prenota un posto, per esempio dalle 09:00 alle 13:00.
- **Posto**: postazione di un'aula studio, che in una fascia oraria ha al più una prenotazione.
- **Posto libero**: posto di un'aula studio senza prenotazione in una fascia oraria.
- **Prenotazione**: assegnazione di un posto a uno Studente, per un'aula studio, una data e una fascia oraria.
- **Dati della prenotazione**: aula studio, data, fascia oraria e posto di una prenotazione.
- **Lista d'attesa**: elenco ordinato degli Studenti che chiedono un posto in una fascia oraria senza posti liberi.
