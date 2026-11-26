# Discrepanze intenzionali — Progetto di prova Cinema

Elenco delle discrepanze inserite deliberatamente tra i casi d'uso (`casi-d-uso/`) e gli artefatti OpenSpec (`openspec/changes/gestione-biglietteria/`) per verificare l'efficacia di **SpecCheck** (issue #144)[cite: 4].

---

## 1. Comportamento diverso nella consegna del biglietto (Email vs SMS)
- **Tipologia:** Comportamento diverso / incongruenza tra attori e requisiti[cite: 4].
- **Caso d'uso coinvolto:** `UC1 Acquistare un biglietto` (`casi-d-uso/UC1-acquistare-un-biglietto.md`, passo 9 e postcondizioni).
- **File OpenSpec coinvolti:**
  - `openspec/changes/gestione-biglietteria/specs/biglietteria/spec.md` (Requisito *Pagamento ed Emissione Biglietto*)
  - `openspec/changes/gestione-biglietteria/proposal.md` (sezione *Ambito*)
  - `openspec/changes/gestione-biglietteria/design.md` (componente *SmsNotificationAdapter*)
- **Descrizione:** In `UC1` è previsto l'attore secondario `Servizio di posta del cinema` e il sistema invia il codice del biglietto **via email**. Nei requisiti e nel design di OpenSpec il servizio email è assente e il sistema invia invece il codice **via SMS** al numero di telefono dello Spettatore.

---

## 2. Caso d'uso mancante nei requisiti (Applicazione codice sconto)
- **Tipologia:** Caso d'uso non coperto dai requisiti (mancata tracciabilità diretta)[cite: 4, 5].
- **Caso d'uso coinvolto:** `UC3 Applicare un codice sconto` (`casi-d-uso/UC3-applicare-un-codice-sconto.md`, estensione di `UC1` al passo 5).
- **File OpenSpec coinvolti:**
  - `openspec/changes/gestione-biglietteria/specs/biglietteria/spec.md`
  - `openspec/changes/gestione-biglietteria/proposal.md`
  - `openspec/changes/gestione-biglietteria/design.md`
- **Descrizione:** Il caso d'uso `UC3` definisce la possibilità per lo Spettatore di inserire un codice sconto promozionale prima della conferma dell'acquisto, ma tale funzionalità è stata completamente omessa dai requisiti in `spec.md`, dall'ambito in `proposal.md` e dai componenti in `design.md`.

---

## 3. Requisito extra senza caso d'uso corrispondente (Annullamento biglietto)
- **Tipologia:** Requisito non tracciato da alcun caso d'uso (verifica inversa / feature creep)[cite: 4, 5].
- **Caso d'uso coinvolto:** Nessuno (assente in `casi-d-uso/`).
- **File OpenSpec coinvolti:**
  - `openspec/changes/gestione-biglietteria/specs/biglietteria/spec.md` (Requisito *Annullamento Biglietto*)
  - `openspec/changes/gestione-biglietteria/proposal.md` (sezione *Ambito*)
  - `openspec/changes/gestione-biglietteria/design.md` (componente *BiglietteriaService*)
- **Descrizione:** In `spec.md` (e nei relativi `proposal.md` e `design.md`) è presente il requisito *Annullamento Biglietto*, che consente allo Spettatore di annullare un biglietto fino a 2 ore prima della proiezione ottenendo il rimborso, ma nella cartella `casi-d-uso/` non esiste alcun caso d'uso che descriva questa funzionalità.