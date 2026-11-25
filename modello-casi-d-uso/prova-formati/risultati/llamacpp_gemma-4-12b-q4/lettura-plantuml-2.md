1. gli attori:
- Studente
- Utente
- Servizio di posta dell'ateneo

2. i casi d'uso:
- UC1: Prenotare un posto ..punti di estensione.. nessun posto libero (passo 5a)
- UC2: Autenticarsi
- UC3: Iscriversi alla lista d'attesa

3. il confine del sistema:
- Nome: Aule studio
- Casi d'uso contenuti: UC1, UC2, UC3

4. le relazioni:
- Studente -> UC1: associazione
- UC1 -> ServizioPosta: associazione
- Utente -> UC2: associazione
- Utente -> Studente: generalizzazione
- UC1 -> UC2: inclusione
- UC3 -> UC1: estensione

5. i punti di estensione e le condizioni delle estensioni:
- Punto di estensione: nessun posto libero (passo 5a)
- Condizione: lo Studente chiede di entrare nella lista d'attesa della fascia oraria
- Punto di estensione: nessun posto libero
