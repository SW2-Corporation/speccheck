1. gli attori:
- Studente
- Utente
- Servizio di posta dell'ateneo

2. i casi d'uso:
- UC1 Prenotare un posto
- UC2 Autenticarsi
- UC3 Iscriversi alla lista d'attesa

3. il confine del sistema:
- Nome: Aule studio
- Casi d'uso contenuti: UC1 Prenotare un posto, UC2 Autenticarsi, UC3 Iscriversi alla lista d'attesa

4. le relazioni:
- Studente -> Utente: generalizzazione
- Studente -> UC1 Prenotare un posto: associazione
- UC1 Prenotare un posto -> Servizio di posta dell'ateneo: associazione
- Utente -> UC2 Autenticarsi: associazione
- UC1 Prenotare un posto -> UC2 Autenticarsi: inclusione
- UC3 Iscriversi alla lista d'attesa -> UC1 Prenotare un posto: estensione

5. i punti di estensione e le condizioni delle estensioni:
- Punto di estensione: nessun posto libero (passo 5a)
- Condizione: lo Studente chiede di entrare nella lista d'attesa della fascia oraria
