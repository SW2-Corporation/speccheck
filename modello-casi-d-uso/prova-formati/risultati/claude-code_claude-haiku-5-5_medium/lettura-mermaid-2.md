1. **Attori**
   1. Studente
   2. Utente
   3. ServizioPosta (etichetta: "Servizio di posta dell'ateneo")

2. **Casi d'uso**
   1. UC1: Prenotare un posto
   2. UC2: Autenticarsi
   3. UC3: Iscriversi alla lista d'attesa

3. **Confine del sistema**
   - Nome: "Aule studio"
   - Casi d'uso contenuti: UC1, UC2, UC3

4. **Relazioni**
   1. Studente -> Utente: generalizzazione
   2. Studente -> UC1: associazione
   3. UC1 -> ServizioPosta: associazione
   4. Utente -> UC2: associazione
   5. UC1 -> UC2: inclusione
   6. UC3 -> UC1: estensione

   Nota: nel sorgente le righe delle relazioni 5 e 6 (`UC1 ..> : include UC2` e `UC3 ..> : extend UC1`) non hanno un nodo di destinazione prima dei due punti. Il caso d'uso indicato nell'etichetta è stato considerato la destinazione.

5. **Punti di estensione e condizioni**
   1. Punto di estensione associato a UC1: "nessun posto libero (passo 5a)"
   2. Condizione associata a UC3: "lo Studente chiede di entrare nella lista d'attesa della fascia oraria"

   Nota: il diagramma non collega esplicitamente la condizione al punto di estensione. Il passo "5a" è citato solo nella nota e non è definito nel sorgente.
