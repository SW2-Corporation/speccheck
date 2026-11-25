1. **Attori:**
   - Studente
   - Utente
   - Servizio di posta dell'ateneo (alias `ServizioPosta`)

2. **Casi d'uso:**
   - UC1: Prenotare un posto
   - UC2: Autenticarsi
   - UC3: Iscriversi alla lista d'attesa

3. **Confine del sistema:** "Aule studio", che contiene UC1, UC2, UC3.

4. **Relazioni:**
   - Studente -> UC1: associazione
   - UC1 -> Servizio di posta dell'ateneo: associazione
   - Utente -> UC2: associazione
   - Studente -> Utente: generalizzazione (nel sorgente è scritto `Utente <|-- Studente`, quindi Studente è il sottotipo e la freccia punta a Utente)
   - UC1 -> UC2: inclusione (`<<include>>`)
   - UC3 -> UC1: estensione (`<<extend>>`)

5. **Punti di estensione e condizioni:**
   - Punto di estensione: "nessun posto libero", riportato nella descrizione di UC1 come passo 5a.
   - Condizione: lo Studente chiede di entrare nella lista d'attesa della fascia oraria. La nota è scritta subito dopo la relazione UC3 -> UC1, quindi si riferisce a quel collegamento di estensione.
