Ecco l'elenco degli elementi contenuti nel diagramma:

1. **Attori:**
   - Studente
   - Utente
   - Servizio di posta dell'ateneo

2. **Casi d'uso:**
   - UC1: Prenotare un posto ..punti di estensione.. nessun posto libero (passo 5a)
   - UC2: Autenticarsi
   - UC3: Iscriversi alla lista d'attesa

3. **Confine del sistema:**
   - Nome: Aule studio
   - Casi d'uso contenuti: UC1 Prenotare un posto ..punti di estensione.. nessun posto libero (passo 5a), UC2 Autenticarsi, UC3 Iscriversi alla lista d'attesa

4. **Relazioni:**
   - Studente -> UC1: associazione
   - UC1 -> Servizio di posta dell'ateneo: associazione
   - Utente -> UC2: associazione
   - Studente -> Utente: generalizzazione
   - UC1 -> UC2: inclusione
   - UC3 -> UC1: estensione

5. **Punti di estensione e condizioni delle estensioni:**
   - Punto di estensione: nessun posto libero
   - Condizione: lo Studente chiede di entrare nella lista d'attesa della fascia oraria
