# Modello dei casi d'uso letti da SpecCheck

Bozza del 2026-11-21, prima versione per il PoC, aggiornata il 2026-11-25 con il formato dei diagrammi. Nasce dalla decisione VE-2026-11-17.3 (issue SW2-Corporation/docs#141). Va rivista dopo l'incontro in cui il proponente illustrerà il suo studio sull'estensione dei casi d'uso.

## Scopo

Il modello fissa come si scrive un caso d'uso che SpecCheck legge. Ogni caso d'uso è un file Markdown con un diagramma e un testo a struttura fissa. Il testo segue regole che tengono bassa l'ambiguità, perché a interpretarlo è un LLM.

Il testo è la fonte principale: secondo il proponente, il significato di un caso d'uso sta soprattutto nel testo di contorno. Il diagramma ne mostra una vista e non aggiunge informazioni.

## File e identificativi

- Ogni caso d'uso ha un file nella cartella `casi-d-uso/` alla radice del progetto.
- Il nome del file è l'identificativo seguito dal titolo in minuscolo, con trattini al posto degli spazi: `UC1-prenotare-un-posto.md`.
- L'identificativo è `UC` seguito da un numero progressivo. Un sotto-caso d'uso aggiunge un secondo numero: `UC1.1`.
- Un identificativo non si riusa, nemmeno dopo l'eliminazione del suo caso d'uso.

## Struttura del file

Le sezioni hanno titoli fissi e compaiono in quest'ordine: SpecCheck trova ogni parte dal titolo della sua sezione. Lo scheletro da copiare è [scheletro.md](scheletro.md).

| Sezione | Obbligatoria | Contenuto |
|---|---|---|
| `# UCn Titolo` | Sì | Identificativo e titolo del caso d'uso |
| `## Diagramma` | Sì | Un solo blocco di codice `mermaid`, con il contenuto e le scritture descritti nella sezione Diagramma |
| `## Descrizione` | Sì | Voci fisse: attore principale, attori secondari, precondizioni, postcondizioni |
| `## Scenario principale` | Sì | I passi numerati dello scenario in cui l'attore principale raggiunge il suo obiettivo |
| `## Scenari alternativi` | Se ce ne sono | Le alternative, ognuna numerata a partire dal passo da cui parte |
| `## Relazioni` | Se ce ne sono | Inclusioni, estensioni e generalizzazioni tra attori |
| `## Termini` | Sì | La definizione di ogni termine del dominio usato nel file, attori compresi |

Una voce della descrizione senza contenuto riporta «Nessuno.», per chiarire che è una voce vuota, non una dimenticanza.

## Diagramma

Il diagramma di un file mostra:

- il caso d'uso del file e i suoi attori;
- i casi d'uso che include e quelli che lo estendono;
- gli attori dei casi d'uso collegati e le generalizzazioni tra attori, solo se servono a capire il caso d'uso del file;
- il confine del sistema, con il nome del sistema;
- i punti di estensione e le condizioni delle estensioni.

Il sorgente usa queste scritture, le stesse della prova dei formati:

- si apre con `usecase-beta` e `direction LR`;
- un attore ha come identificativo il suo nome; se il nome ha spazi, l'identificativo è senza spazi e il nome sta nell'etichetta: `actor ServizioPosta("Servizio di posta dell'ateneo")`;
- un caso d'uso ha come identificativo il suo `UCn` e come etichetta `UCn Titolo`: `UC1("UC1 Prenotare un posto")`. Mermaid non accetta il punto in un identificativo: in quello di un sotto-caso d'uso il punto diventa un trattino basso, e l'etichetta resta con il punto: `UC1_1("UC1.1 Scegliere la fascia oraria")`;
- il confine del sistema è un `systemBoundary` con il nome del sistema, che contiene i casi d'uso fino a `end`;
- una generalizzazione va dall'attore specifico a quello generale: `Studente --|> Utente`;
- un'inclusione va dal caso d'uso che include a quello incluso: `UC1 ..> : include UC2`;
- un'estensione va dal caso d'uso che estende a quello esteso: `UC3 ..> : extend UC1`;
- il punto di estensione si scrive una volta sola, in una nota sul caso d'uso esteso: `note for UC1 "Punto di estensione: nessun posto libero (passo 5a)"`;
- la condizione dell'estensione si scrive in una nota sul caso d'uso che estende: `note for UC3 "Condizione: …"`.

## Regole di scrittura del testo

Ogni regola si verifica con un sì o con un no.

1. **Un identificativo per caso d'uso.** L'identificativo compare nel titolo, nel diagramma e in ogni riferimento al caso d'uso.
2. **Il titolo dice l'obiettivo dell'attore principale**, con un verbo all'infinito e il suo complemento. Sì: «Prenotare un posto». No: «Gestione delle prenotazioni», «Pagina di prenotazione».
3. **Un passo, un'azione.** Ogni passo è una sola frase al presente, in forma attiva. Il soggetto è esplicito: un attore, con il nome che ha nel diagramma, oppure «il sistema». Sì: «Il sistema registra la prenotazione.» No: «La prenotazione viene registrata e si invia una email.»
4. **Un termine, un significato.** Un concetto ha sempre lo stesso nome, definito nella sezione Termini. Sì: sempre «prenotazione». No: «prenotazione», poi «riserva», poi «booking».
5. **Niente parole vaghe né pronomi ambigui.** Non si usano «adeguato», «opportuno», «velocemente», «facilmente», «eventualmente», «ecc.» ed «e/o». Un pronome si usa solo se può riferirsi a un solo nome; altrimenti si ripete il nome. Sì: «Il sistema comunica allo Studente che la fascia oraria non ha posti liberi.» No: «Il sistema lo comunica in modo adeguato.»
6. **Cosa, non come.** Il testo descrive gli scambi tra gli attori e il sistema, non l'interfaccia né la tecnologia. I requisiti non funzionali, come prestazioni e sicurezza, vanno nei requisiti. Sì: «Lo Studente sceglie un'aula studio.» No: «Lo Studente sceglie un'aula studio dal menu a tendina.»
7. **Condizioni verificabili.** Precondizioni e postcondizioni sono stati veri o falsi, non azioni. Le precondizioni sono vere prima dell'inizio e il caso d'uso non le controlla. Le postcondizioni sono vere alla fine dello scenario principale. Sì: «Esiste una prenotazione dello Studente.» No: «Lo Studente prenota.»
8. **Ogni alternativa dice da dove parte e come finisce.** Il suo numero è quello del passo da cui parte, seguito da una lettera: `5a`. La condizione comincia con «Se». L'ultima frase dice se il caso d'uso riprende da un passo o termina, e con quale esito.
9. **Le relazioni stanno anche nel testo.** Un'inclusione si cita nel passo in cui avviene, con identificativo e titolo del caso d'uso incluso. Un'estensione si cita nella sezione Relazioni, con il punto di estensione, il passo e la condizione. Il punto di estensione si segna anche nel passo o nell'alternativa in cui si trova, con la frase fissa `Punto di estensione «nome».`, nel punto esatto in cui si inserisce il caso d'uso che estende. Anche una generalizzazione tra attori si cita nella sezione Relazioni.
10. **Diagramma e testo dicono le stesse cose.** Ogni attore, caso d'uso e relazione del diagramma compare nel testo. Ogni attore del testo e ogni caso d'uso che il testo cita compare nel diagramma.

## Formato dei diagrammi

Mermaid, con il diagramma dei casi d'uso di Mermaid 12.3.0 (parola chiave `usecase-beta`). La [prova dei formati](prova-formati/README.md) mostra che gli LLM leggono bene entrambi i formati, se il sorgente è scritto nello stesso modo: con un sorgente PlantUML equivalente a quello Mermaid, Gemma 4 12B non ha fatto errori in 5 letture, come con Mermaid. Con i criteri fissati prima della prova vincerebbe PlantUML, per i 2 errori di Haiku su Mermaid e per la sintassi stabile. Il modello propone comunque Mermaid per due requisiti del prodotto. Il parser di Mermaid funziona in Node, lo stesso runtime del plugin, ed estrae tutto il diagramma senza LLM. GitHub mostra i diagrammi Mermaid, quindi anche la proposta di OpenSpec può mostrarli. Lo scostamento dai criteri va confermato dal proponente.

Il diagramma dei casi d'uso di Mermaid è in beta e la sintassi può cambiare in modo incompatibile: per questo la versione è fissata.

SpecCheck non legge altri formati di diagramma: né PlantUML, né XMI, che il capitolato cita ma la decisione VE-2026-11-17.3 non prevede, né immagini PNG o JPEG, che il verbale del 2026-11-17 lascia come funzione da esplorare.

## Esempio

[UC1 Prenotare un posto](esempio/UC1-prenotare-un-posto.md) applica il modello a un sistema inventato, per la prenotazione dei posti nelle aule studio di un ateneo.

## Scelte provvisorie e domande per il proponente

Scelte provvisorie, da confermare: 
- Mermaid per i diagrammi.
- lingua italiana per i casi d'uso.
- un file per caso d'uso.
- la cartella `casi-d-uso/`.

Domande per l'incontro sullo studio del proponente:

1. Va bene Mermaid per i diagrammi, con la versione fissata, anche se il suo diagramma dei casi d'uso è in beta e PlantUML, con una sintassi stabile, è letto altrettanto bene dagli LLM? E va bene non leggere XMI, che il capitolato cita? 
2. In che lingua vanno scritti i casi d'uso? 
3. Quali informazioni aggiunge la sua estensione dei casi d'uso, e in quale sezione andrebbero?

## Riferimenti

- Capitolato C9 «SpecCheck», Zucchetti S.p.A., <https://www.math.unipd.it/~tullio/IS-1/2026/Progetto/C9-SpecCheck.pdf>, ultimo accesso 2026-11-21.
- Verbale esterno del 2026-11-17, decisioni da VE-2026-11-17.2 a VE-2026-11-17.5.
- A. Cockburn, *Writing Effective Use Cases*, Addison-Wesley, 2001.
- ISO/IEC/IEEE 29148:2018, *Systems and software engineering — Life cycle processes — Requirements engineering*.
- Mermaid, «Use case diagrams», <https://mermaid.js.org/syntax/usecase.html>, ultimo accesso 2026-11-21.
- PlantUML, «Use Case Diagram», <https://plantuml.com/use-case-diagram>, ultimo accesso 2026-11-21.
