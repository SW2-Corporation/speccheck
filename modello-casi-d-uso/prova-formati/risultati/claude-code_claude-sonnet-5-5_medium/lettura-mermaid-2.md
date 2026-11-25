1. **Attori**
   1. Studente
   2. Utente
   3. ServizioPosta, con etichetta «Servizio di posta dell'ateneo»

2. **Casi d'uso**
   1. UC1: Prenotare un posto
   2. UC2: Autenticarsi
   3. UC3: Iscriversi alla lista d'attesa

3. **Confine del sistema**
   1. Nome: «Aule studio»
   2. Casi d'uso contenuti: UC1, UC2, UC3

4. **Relazioni**
   1. Studente -> Utente: generalizzazione
   2. Studente -> UC1: associazione
   3. UC1 -> ServizioPosta: associazione
   4. Utente -> UC2: associazione
   5. UC1 -> UC2: inclusione
   6. UC3 -> UC1: estensione

5. **Punti di estensione e condizioni delle estensioni**
   1. Punto di estensione, indicato nella nota associata a UC1: «nessun posto libero (passo 5a)»
   2. Condizione, indicata nella nota associata a UC3: «lo Studente chiede di entrare nella lista d'attesa della fascia oraria»

Nel sorgente, punto di estensione e condizione non sono elementi formali del diagramma. Compaiono solo come testo di due note (`note for`). Le relazioni di inclusione ed estensione usano la forma `UC1 ..> : include UC2`, cioè con l'etichetta tra la freccia e la destinazione. Le ho lette come UC1 include UC2 e UC3 estende UC1.
