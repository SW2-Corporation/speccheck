# Prova dei formati dei diagrammi

La prova confronta PlantUML e Mermaid sullo stesso diagramma dei casi d'uso, come chiede la issue SW2-Corporation/docs#141. Il diagramma è quello del caso d'uso d'esempio, [UC1 Prenotare un posto](../esempio/UC1-prenotare-un-posto.md): [diagramma.puml](diagramma.puml) e [diagramma.mmd](diagramma.mmd) hanno lo stesso contenuto. Il sorgente PlantUML però lo scrive diversamente in tre punti: riporta il punto di estensione due volte, nell'etichetta di UC1 e nella nota sull'estensione; scrive la condizione in una nota sulla relazione, non sul caso d'uso che estende; scrive la generalizzazione da destra a sinistra. Una [prova supplementare](#prova-con-un-sorgente-plantuml-equivalente) toglie queste differenze, e l'[Esito](#esito) ne tiene conto.

## Costrutti usati

Il diagramma usa tutti i costrutti previsti dal modello: attori, casi d'uso, confine del sistema, associazioni, una generalizzazione tra attori, un'inclusione e un'estensione con il suo punto di estensione indicato esplicitamente e la sua condizione.

## Elenco atteso

È la risposta corretta alla prova di lettura. Ogni voce mancante, in più o sbagliata vale un errore. Una relazione con il tipo o il verso sbagliato vale un errore; per le associazioni il verso non conta. Un titolo sbagliato vale un errore una volta sola, anche se la risposta lo ripete. Il punto di estensione ripetuto come attributo dell'estensione che lo usa non è una voce in più; lo è se l'elenco lo riporta come un secondo punto di estensione.

I [Risultati](#risultati) riportano anche i conteggi con due regole alternative, che cambiano un punto ciascuna. Con la regola larga il punto di estensione elencato due volte non conta, e due relazioni sbagliate per la stessa causa nella stessa risposta valgono un errore solo. Con la regola stretta un titolo sbagliato conta a ogni occorrenza.

| N. | Elemento | Atteso |
|---|---|---|
| 1 | Attore | Studente |
| 2 | Attore | Utente |
| 3 | Attore | Servizio di posta dell'ateneo |
| 4 | Caso d'uso | UC1 Prenotare un posto |
| 5 | Caso d'uso | UC2 Autenticarsi |
| 6 | Caso d'uso | UC3 Iscriversi alla lista d'attesa |
| 7 | Confine del sistema | Aule studio, con UC1, UC2 e UC3 |
| 8 | Associazione | Studente – UC1 |
| 9 | Associazione | UC1 – Servizio di posta dell'ateneo |
| 10 | Associazione | Utente – UC2 |
| 11 | Generalizzazione | Studente → Utente: lo Studente è un Utente |
| 12 | Inclusione | UC1 → UC2 |
| 13 | Estensione | UC3 → UC1 |
| 14 | Punto di estensione | «nessun posto libero», al passo 5a di UC1 |
| 15 | Condizione dell'estensione | Lo Studente chiede di entrare nella lista d'attesa della fascia oraria |

## Svolgimento

### Compilazione

PlantUML 1.2026.10 richiede Java (Java 21 è installato). Il jar si scarica dalle release di `plantuml/plantuml` su GitHub; l'impronta SHA-256 di `plantuml-1.2026.10.jar` è `e9bc9e6b2eb715e8c0c929f3dcb5fc1923be13f37599b09c293c66d354e88686`.

```sh
java -jar plantuml-1.2026.10.jar -tsvg diagramma.puml
```

PlantUML impagina i casi d'uso con Graphviz. Se Graphviz manca, lo si installa con il gestore di pacchetti, oppure si aggiunge `!pragma layout smetana` dopo `@startuml` per usare il motore interno.

Mermaid si compila con mermaid-cli 12.2.0, che usa Mermaid 12.3.0. Le due versioni sono fissate in [package.json](../package.json), alla radice del modello, e `npm ci` le installa. Al primo avvio mermaid-cli scarica un browser senza interfaccia.

```sh
npx mmdc -i diagramma.mmd -o diagramma-mermaid.svg
```

Le immagini della prova sono [plantumlDiagramma.png](plantumlDiagramma.png), da [diagramma.puml](diagramma.puml), e [mermaidDiagram.svg](mermaidDiagram.svg), da [diagramma.mmd](diagramma.mmd).

Su GitHub la prova si fa nella scheda *Preview* di un commento, senza pubblicarlo: si incolla il diagramma in un blocco `mermaid`. Un blocco `mermaid` che contiene solo `info` mostra la versione di Mermaid usata da GitHub. GitHub non rende i blocchi PlantUML.

### Prova con un LLM

Lo script [esegui-prova-llm.sh](esegui-prova-llm.sh) esegue con OpenCode la prova di lettura per ogni formato, con lo stesso prompt: [prompt-lettura.txt](prompt-lettura.txt). L'LLM riceve il sorgente del diagramma ed elenca attori, casi d'uso, confine, relazioni, punti di estensione e condizioni. Non può usare strumenti né cercare sul web: risponde solo con ciò che sa.

```sh
./esegui-prova-llm.sh <provider/modello> 5
```

Le risposte vanno in `risultati/<modello>/`. Il piano era di usare un modello gratuito di OpenCode e, se si riusciva a eseguirlo, un modello open-weight piccolo, come prevede la decisione VE-2026-11-17.5. I modelli usati davvero sono in [Modelli usati](#modelli-usati). Le risposte di lettura sono anche un primo esempio dell'interpretazione che il proponente vuole ritrovare nella proposta (decisione VE-2026-11-17.2).

Un modello locale si dichiara come provider di OpenCode in un file a parte, passato come terzo argomento. [provider-llamacpp.json](provider-llamacpp.json) dichiara Gemma 4 12B (Q4_0), servito da llama.cpp su `127.0.0.1:9931`: indirizzo e modello vanno adattati al proprio server.

```sh
./esegui-prova-llm.sh llamacpp/gemma-4-12b-q4 5 provider-llamacpp.json
```

#### Modelli usati

Il modello gratuito di OpenCode non è stato utilizzabile, in quanto raggiunto il limite d'uso prima dell'esecuzione effettiva dei test. Tale limite permane al 2026-11-25.

La prova resta quindi con tre modelli, con 5 esecuzioni per formato ciascuno:

| Modello | Come si esegue | Parametri |
|---|---|---|
| Gemma 4 12B Q4_0 (`ggml-org/gemma-4-12B-it-GGUF:Q4_0`) | In locale con llama.cpp b12359 sulla GPU, tramite OpenCode 2.3.2 e [provider-llamacpp.json](provider-llamacpp.json) | Campionamento predefinito del server: temperatura 1.0, top-k 64, top-p 0.95 |
| Claude Haiku 5.5 (`claude-haiku-5-5`) | Claude Code 2.1.330 in modalità non interattiva | Effort medium |
| Claude Sonnet 5.5 (`claude-sonnet-5-5`) | Claude Code 2.1.330 in modalità non interattiva | Effort medium |

Gemma è il modello open-weight piccolo previsto dalla decisione VE-2026-11-17.5. Haiku e Sonnet si eseguono con Claude Code da una cartella vuota, senza strumenti e con lo stesso messaggio dello script: [prompt-lettura.txt](prompt-lettura.txt) con il nome del formato, una riga vuota e il sorgente del diagramma.

```sh
claude -p --model claude-haiku-5-5 --effort medium --tools "" --strict-mcp-config --no-session-persistence "<messaggio>"
```

Le loro risposte vanno in `risultati/claude-code_<modello>_medium/`. OpenCode e Claude Code aggiungono prompt di sistema diversi, ma ogni modello legge i due formati con lo stesso programma: il confronto tra i formati non ne risente.

Una prima serie di esecuzioni, fatta fino alla sera del 2026-11-24 con Gemma 4 12B e con Qwen 3.5 9B (Q4_K_M, dichiarato in [provider-llamacpp.json](provider-llamacpp.json)), non è in `risultati/` e non entra nel conteggio. Andava nella stessa direzione: con PlantUML il titolo di UC1 comprendeva il punto di estensione in 6 esecuzioni su 15, con Mermaid in nessuna delle 13.

### Prova con un sorgente PlantUML equivalente

Il 2026-11-25 la lettura di PlantUML è stata ripetuta con [diagramma-equivalente.puml](diagramma-equivalente.puml), scritto come [diagramma.mmd](diagramma.mmd): stesse istruzioni, nello stesso ordine. Rispetto a [diagramma.puml](diagramma.puml) cambiano solo tre scritture, per allinearlo al sorgente Mermaid e togliere le cause degli errori di PlantUML:

- il punto di estensione è scritto una volta sola, in una nota su UC1, e non più nell'etichetta di UC1 né nella nota sull'estensione;
- la condizione dell'estensione è in una nota su UC3, come in Mermaid, e non in una nota sulla relazione;
- la generalizzazione è scritta da sinistra a destra: `Studente --|> Utente`.

Il sorgente si compila con PlantUML 1.2025.2 e mostra le 15 voci dell'elenco atteso: [diagramma-equivalente.png](diagramma-equivalente.png).

Sono state ripetute solo le 5 letture di Gemma, l'unico modello che aveva sbagliato su PlantUML. Prompt, OpenCode 2.3.2, llama.cpp b12359 e campionamento predefinito del server sono quelli della prova principale, e il prompt presenta il sorgente come PlantUML.

```sh
FORMATI=plantuml-equivalente ./esegui-prova-llm.sh llamacpp/gemma-4-12b-q4 5 provider-llamacpp.json
```

Le risposte sono in `risultati/llamacpp_gemma-4-12b-q4/lettura-plantuml-equivalente-*.md`. Tutte e 5 riportano le 15 voci senza errori, con ciascuna delle tre regole di conteggio. Haiku e Sonnet non sono stati ripetuti: non avevano fatto errori nemmeno sul sorgente originale, che conteneva le scritture tolte qui.

### Lettura con il parser di Mermaid

Lo script [leggi-diagramma-mermaid.mjs](leggi-diagramma-mermaid.mjs) legge il diagramma con il parser di Mermaid 12.3.0, in Node, senza browser e senza LLM, e ne stampa gli elementi nella forma dell'elenco atteso.

```sh
node leggi-diagramma-mermaid.mjs diagramma.mmd
```

Su [diagramma.mmd](diagramma.mmd) estrae tutte le 15 voci dell'elenco atteso: le voci da 1 a 13 come elementi del diagramma, il punto di estensione e la condizione come testo delle note su UC1 e su UC3. Su un sorgente con un errore di sintassi si ferma e indica riga e colonna dell'errore. Questa lettura non è tra i criteri fissati prima della prova, ma è uno dei motivi della scelta nell'[Esito](#esito).

Il parser non accetta il punto in un identificativo: `UC1.1("UC1.1 …")` dà un errore di sintassi in corrispondenza di `.1`, mentre `UC1_1("UC1.1 …")` si legge, con l'etichetta intera. Per questo il modello scrive con il trattino basso l'identificativo di un sotto-caso d'uso (prova del 2026-11-25).

## Risultati

I criteri fissati prima della prova sono i costrutti, la lettura da LLM e, in caso di parità, la stabilità. Le altre righe sono fatti che quei criteri non misurano: l'[Esito](#esito) spiega perché contano per la scelta.

| Aspetto | PlantUML | Mermaid |
|---|---|---|
| Costrutti | Attore, caso d'uso, confine (`rectangle`), associazione, generalizzazione e nota. Inclusione ed estensione come etichette di frecce tratteggiate. Nessuna sintassi per i punti di estensione: vanno in una sezione con titolo della descrizione del caso d'uso | Attore, caso d'uso, confine (`systemBoundary`), associazione, generalizzazione e nota. Inclusione ed estensione con parole chiave proprie. Nessuna sintassi per i punti di estensione: vanno in una nota |
| Lettura da LLM, sorgenti della prova principale: errori su 5 esecuzioni per modello | 6 (Gemma 6, Haiku 0, Sonnet 0); 4 con la regola larga, 8 con quella stretta | 2 (Gemma 0, Haiku 2, Sonnet 0); 1 con la regola larga, 2 con quella stretta |
| Lettura da LLM, sorgente PlantUML equivalente: errori su 5 esecuzioni | 0 (Gemma 0, con tutte e tre le regole; Haiku e Sonnet non ripetuti, 0 sul sorgente originale) | Come sopra: 2, da 1 a 2 secondo la regola |
| Resa su GitHub | No | Sì |
| Dipendenze | Java, più Graphviz o il motore interno | Runtime JavaScript; un browser senza interfaccia solo per le immagini |
| Lettura con un parser in Node, il runtime del plugin | No: il parser di PlantUML è in Java | Sì: estrae tutte le voci dell'elenco atteso, vedi [Lettura con il parser di Mermaid](#lettura-con-il-parser-di-mermaid) |
| Stabilità | Sintassi stabile | Beta: secondo la documentazione la sintassi può ancora cambiare in modo incompatibile |

## Esito

Con i criteri fissati prima della prova, i dati raccolti portano a PlantUML. La proposta resta Mermaid per due requisiti del prodotto che quei criteri non comprendevano. Lo scostamento è dichiarato qui e va confermato dal proponente.

1. **Costrutti.** Entrambi i formati rappresentano tutti i costrutti richiesti, quindi nessuno è escluso. PlantUML ha qualcosa in più: una nota si può attaccare a una relazione, e i punti di estensione possono stare dentro il caso d'uso. In Mermaid invece le note si attaccano solo ad attori e casi d'uso. Il criterio però esclude un formato, non li ordina; e per il modello il diagramma non aggiunge informazioni al testo.
2. **Lettura da LLM.** Con i sorgenti della prova principale PlantUML ha 6 errori e Mermaid 2. Gli errori di PlantUML però vengono tutti da come è scritto il sorgente, non dal formato:
   - in 3 risposte il titolo di UC1 comprende `..punti di estensione..`: Gemma prende la sezione con titolo dell'etichetta per parte del titolo;
   - in 2 risposte il punto di estensione compare due volte, perché il sorgente lo scrive due volte: nella sezione di UC1 e nella nota sull'estensione;
   - in 1 risposta la generalizzazione è al contrario: il sorgente PlantUML la scrive da destra a sinistra, `Utente <|-- Studente`, quello Mermaid da sinistra a destra, `Studente --|> Utente`.

   Con il [sorgente equivalente](#prova-con-un-sorgente-plantuml-equivalente) Gemma non fa errori, come con Mermaid. Haiku e Sonnet non ne avevano fatti nemmeno sul sorgente originale. Restano i 2 errori di Haiku su Mermaid, in una sola esecuzione, che vengono dalla sua sintassi: in `UC1 ..> : include UC2` la destinazione sta dopo l'etichetta. Il conteggio diventa 0 per PlantUML e 2 per Mermaid: con la regola base e con quella stretta vince PlantUML, con quella larga, 0 contro 1, c'è parità.
3. **Stabilità.** Decide solo in caso di parità, cioè con la regola larga, e favorisce PlantUML: il diagramma dei casi d'uso di Mermaid è in beta e la sintassi può ancora cambiare in modo incompatibile.

La proposta resta Mermaid per due fatti emersi durante la prova. I criteri non li misurano, ma per SpecCheck contano più della lettura da LLM:

- il parser di Mermaid funziona in Node, lo stesso runtime del plugin, ed estrae dal sorgente tutte le voci dell'elenco atteso: vedi [Lettura con il parser di Mermaid](#lettura-con-il-parser-di-mermaid). Il plugin può quindi ricavare gli elementi del diagramma senza LLM e passare all'LLM la struttura estratta e controllata: gli errori di lettura del sorgente, come quelli di Haiku, non sarebbero più possibili. Non è ancora stato provato con un LLM. Il parser di PlantUML invece è in Java, che andrebbe aggiunto all'installazione di SpecCheck; senza Java il diagramma dovrebbe leggerlo l'LLM;
- GitHub mostra i diagrammi Mermaid e non quelli PlantUML: la proposta di OpenSpec può mostrare i diagrammi dei casi d'uso, come chiede la decisione VE-2026-11-17.2.

Se il gruppo o il proponente preferiscono seguire i criteri fissati prima della prova, il formato diventa PlantUML: vanno riscritti lo scheletro, l'esempio e le scritture del diagramma, e la lettura senza LLM richiede Java.

Conseguenze:

- il modello dei casi d'uso adotta Mermaid, in attesa della conferma, con il diagramma `usecase-beta` di Mermaid 12.3.0. Fissare la versione limita il rischio della sintassi in beta. La versione è fissata in [package.json](../package.json) e va fissata anche nelle Norme di Progetto e nel repository del prodotto, prima che il plugin usi Mermaid;
- il modello fissa le scritture usate nella prova: la generalizzazione va dall'attore specifico a quello generale, `Studente --|> Utente`; il punto di estensione si scrive una volta sola, in una nota sul caso d'uso esteso; la condizione dell'estensione si scrive in una nota sul caso d'uso che estende. Per il parser, l'identificativo di un sotto-caso d'uso usa il trattino basso al posto del punto: `UC1_1`;
- nel caso d'uso d'esempio e nello scheletro resta solo il blocco Mermaid;
- per il PoC si propone che il plugin legga il diagramma con il parser di Mermaid e dia all'LLM la struttura estratta, non il sorgente;
- la scelta si rivede con lo studio del proponente sull'estensione dei casi d'uso (decisione VE-2026-11-17.3), per esempio se richiede note sulle relazioni, che Mermaid non ha.
