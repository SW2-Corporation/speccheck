# UC1 Aggiungere un prodotto

- **Attore principale**: utente.
- **Precondizioni**: la lista della spesa è aperta.
- **Postcondizioni**: il prodotto è in fondo alla lista, non acquistato.

## Scenario principale
1. L'utente scrive il nome del prodotto.
2. L'utente conferma.
3. Il sistema aggiunge il prodotto in fondo alla lista.

## Estensioni
- 2a. Il nome è vuoto: il sistema non aggiunge niente e mostra un avviso.
- 2b. Il prodotto è già nella lista e non è acquistato: il sistema non lo aggiunge di nuovo e mostra un avviso.
