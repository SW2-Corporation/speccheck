1. **Attori:**
   - Studente
   - Utente
   - Servizio di posta dell'ateneo (alias `ServizioPosta`)

2. **Casi d'uso:**
   - UC1: Prenotare un posto
   - UC2: Autenticarsi
   - UC3: Iscriversi alla lista d'attesa

3. **Confine del sistema:** "Aule studio", che contiene UC1, UC2 e UC3.

4. **Relazioni:**
   - Studente -> UC1: associazione
   - UC1 -> ServizioPosta: associazione
   - Utente -> UC2: associazione
   - Studente -> Utente: generalizzazione
   - UC1 -> UC2: inclusione
   - UC3 -> UC1: estensione

5. **Punti di estensione e condizioni:**
   - Punto di estensione di UC1: "nessun posto libero", indicato come passo 5a.
   - Condizione dell'estensione: lo Studente chiede di entrare nella lista d'attesa della fascia oraria. La nota è collegata all'ultimo collegamento definito, cioè alla relazione UC3 -> UC1 (estensione).
