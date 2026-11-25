1. **Attori**
   - Studente
   - Utente
   - ServizioPosta, con etichetta «Servizio di posta dell'ateneo»

2. **Casi d'uso**
   - UC1: Prenotare un posto
   - UC2: Autenticarsi
   - UC3: Iscriversi alla lista d'attesa

3. **Confine del sistema**
   - Nome: «Aule studio»
   - Casi d'uso contenuti: UC1, UC2, UC3

4. **Relazioni**
   - Studente -> Utente: generalizzazione
   - Studente -> UC1: associazione
   - UC1 -> ServizioPosta: associazione
   - Utente -> UC2: associazione
   - UC1 -> UC2: inclusione
   - UC3 -> UC1: estensione

   La freccia `UC1 ..> : include UC2` non ha un destinatario esplicito prima dei due punti. Ho ricavato la destinazione UC2 dall'etichetta «include UC2».

5. **Punti di estensione e condizioni**
   - Punto di estensione associato a UC1: «nessun posto libero (passo 5a)»
   - Condizione associata a UC3: «lo Studente chiede di entrare nella lista d'attesa della fascia oraria»
