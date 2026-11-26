# UC2 Autenticarsi

## Diagramma

```mermaid
usecase-beta
direction LR
actor Utente
systemBoundary "Sistema Cinema"
  UC2("UC2 Autenticarsi")
end
Utente -- UC2
```

## Descrizione

- Attore principale: Utente.
- Attori secondari: Nessuno.
- Precondizioni: l'Utente possiede un account registrato nel sistema.
- Postcondizioni: esiste una sessione attiva associata all'Utente.

## Scenario principale

1. L'Utente chiede di accedere al sistema.
2. Il sistema richiede le credenziali dell'Utente.
3. L'Utente inserisce indirizzo email e password.
4. Il sistema verifica che le credenziali corrispondano a un account registrato.
5. Il sistema avvia una sessione attiva per l'Utente.

## Scenari alternativi

- **4a.** Se le credenziali non corrispondono a un account registrato, il sistema comunica all'Utente che le credenziali non sono valide. Il caso d'uso riprende dal passo 2.

## Relazioni

- Nessuno.

## Termini

- **Utente**: persona registrata nel sistema.
- **Credenziali**: coppia formata da indirizzo email e password dell'Utente.
- **Sessione attiva**: stato autenticato che identifica l'Utente durante l'uso del sistema.