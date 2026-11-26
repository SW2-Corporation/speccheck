# Design: Architettura Modulo Biglietteria

## Componenti Principali
- **AuthService**: gestisce la verifica delle credenziali (email e hash della password) e l'emissione del token di sessione attiva.
- **ProiezioniService**: interroga il catalogo delle proiezioni programmate e calcola in tempo reale le poltrone libere per ogni sala.
- **BiglietteriaService**: orchestra l'acquisto e l'eventuale annullamento dei biglietti, verifica il blocco della poltrona selezionata per evitare doppie prenotazioni e coordina pagamenti e rimborsi.
- **PaymentGatewayAdapter**: incapsula la comunicazione con il gateway di pagamento esterno per addebiti e storni.
- **SmsNotificationAdapter**: invia il codice del biglietto al numero di telefono dello spettatore tramite provider SMS.

## Flusso dei Dati
1. L'utente si autentica tramite `AuthService` ottenendo una sessione valida.
2. `BiglietteriaService` calcola il prezzo base del biglietto per la poltrona selezionata.
3. Dopo la conferma positiva del `PaymentGatewayAdapter`, `BiglietteriaService` persiste il biglietto nel database, marca la poltrona come occupata e invoca `SmsNotificationAdapter` per la consegna del codice.
4. In caso di annullamento richiesto almeno 2 ore prima della proiezione, `BiglietteriaService` libera la poltrona e richiede lo storno tramite `PaymentGatewayAdapter`.