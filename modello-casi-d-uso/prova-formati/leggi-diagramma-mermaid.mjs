// Legge un diagramma dei casi d'uso Mermaid con il parser di Mermaid, senza browser né LLM,
// e ne stampa gli elementi nella forma dell'elenco atteso della prova.
// Uso: node leggi-diagramma-mermaid.mjs <file .mmd>
// Richiede le dipendenze del modello: npm ci nella cartella che contiene package.json.
import { readFileSync } from 'node:fs';
import mermaid from 'mermaid';

const file = process.argv[2];
if (!file) {
  console.error('Uso: node leggi-diagramma-mermaid.mjs <file .mmd>');
  process.exit(2);
}

const sorgente = readFileSync(file, 'utf8');
let db;
try {
  await mermaid.parse(sorgente); // registra i tipi di diagramma e controlla la sintassi
  ({ db } = await mermaid.mermaidAPI.getDiagramFromText(sorgente));
} catch (errore) {
  console.error(`Errore di sintassi: ${errore.message}`);
  process.exit(1);
}

// Alcuni elenchi del parser sono Map, altri array.
const elenco = (valore) => (valore instanceof Map ? [...valore.values()] : valore);
const attori = elenco(db.getActors());
const casi = elenco(db.getUseCases());
const nomi = new Map([...attori, ...casi].map((elemento) => [elemento.id, elemento.label]));
const nome = (id) => nomi.get(id) ?? id;
const tipi = {
  association: 'associazione',
  generalization: 'generalizzazione',
  include: 'inclusione',
  extend: 'estensione',
};

const sezioni = [
  ['Attori', attori.map((attore) => attore.label)],
  ["Casi d'uso", casi.map((caso) => caso.label)],
  ['Confine del sistema', elenco(db.getSystemBoundaries()).map((confine) => `${confine.label}, con ${confine.members.join(', ')}`)],
  ['Relazioni', elenco(db.getRelationships()).map((r) => `${nome(r.source)} -> ${nome(r.target)}: ${tipi[r.type] ?? r.type}`)],
  ['Note', elenco(db.getNotes()).map((nota) => `su ${nota.target}: ${nota.label}`)],
];
for (const [titolo, voci] of sezioni) {
  console.log(`${titolo}:`);
  for (const voce of voci) console.log(`- ${voce}`);
}
