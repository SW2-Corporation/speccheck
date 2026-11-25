**1. Attori**
1. Studente
2. Utente
3. Servizio di posta dell'ateneo

**2. Casi d'uso**
1. UC1: Prenotare un posto
2. UC2: Autenticarsi
3. UC3: Iscriversi alla lista d'attesa

**3. Confine del sistema**
1. Nome: «Aule studio»
2. Casi d'uso contenuti: UC1, UC2, UC3

**4. Relazioni**
1. Studente -> UC1: associazione
2. UC1 -> Servizio di posta dell'ateneo: associazione
3. Utente -> UC2: associazione
4. Studente -> Utente: generalizzazione
5. UC1 -> UC2: inclusione
6. UC3 -> UC1: estensione

**5. Punti di estensione e condizioni**
1. Punto di estensione di UC1: «nessun posto libero (passo 5a)»
2. Estensione UC3 -> UC1:
   - Condizione: «lo Studente chiede di entrare nella lista d'attesa della fascia oraria»
   - Punto di estensione: «nessun posto libero»
