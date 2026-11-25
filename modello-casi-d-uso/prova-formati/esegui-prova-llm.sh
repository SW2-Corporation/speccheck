#!/usr/bin/env bash
# Prova di lettura dei diagrammi dei casi d'uso con un LLM, tramite OpenCode.
# Uso: ./esegui-prova-llm.sh provider/modello [esecuzioni] [configurazione del provider]
# Le risposte vanno in risultati/<modello>/; lo script non modifica altri file.
set -euo pipefail

modello="${1:?Indicare il modello nella forma provider/modello}"
esecuzioni="${2:-3}"
provider="${3:-}"
qui="$(cd "$(dirname "$0")" && pwd)"
uscita="$qui/risultati/${modello//\//_}"
mkdir -p "$uscita"

# OpenCode è un agente: parte da una cartella vuota, così non trova altri file da leggere o modificare.
vuota="$(mktemp -d)"
trap 'rm -rf "$vuota"' EXIT
# Il modello non usa strumenti, né la ricerca sul web: risponde solo con ciò che sa.
echo '{"$schema": "https://opencode.ai/config.json", "permission": {"*": "deny"}}' > "$vuota/opencode.json"
# Un modello locale si dichiara in una configurazione di OpenCode a parte, che OpenCode unisce a quella sopra.
if [ -n "$provider" ]; then
  mkdir -p "$vuota/.opencode"
  cp "$provider" "$vuota/.opencode/opencode.json"
fi

chiedi() {  # chiedi <file di uscita> <messaggio>
  (cd "$vuota" && opencode run --archived -m "$modello" "$2") > "$1"
}

# FORMATI limita la prova a un formato, per esempio FORMATI=mermaid per completare le esecuzioni mancanti.
# FORMATI=plantuml-equivalente legge diagramma-equivalente.puml, scritto come diagramma.mmd; l'LLM lo riceve come PlantUML.
for formato in ${FORMATI:-plantuml mermaid}; do
  if [ "$formato" = plantuml ]; then
    sorgente="$qui/diagramma.puml"
    nome="PlantUML"
  elif [ "$formato" = plantuml-equivalente ]; then
    sorgente="$qui/diagramma-equivalente.puml"
    nome="PlantUML"
  else
    sorgente="$qui/diagramma.mmd"
    nome="Mermaid (diagramma dei casi d'uso, parola chiave usecase-beta)"
  fi
  lettura="$(sed "s/{FORMATO}/$nome/" "$qui/prompt-lettura.txt")"
  # Le esecuzioni nuove proseguono la numerazione di quelle già in risultati/, senza sovrascriverle.
  for _ in $(seq 1 "$esecuzioni"); do
    i=1
    while [ -e "$uscita/lettura-$formato-$i.md" ]; do i=$((i + 1)); done
    chiedi "$uscita/lettura-$formato-$i.md" "$lettura"$'\n\n'"$(cat "$sorgente")"
    echo "$formato, esecuzione $i: fatta"
  done
done
echo "Risposte in $uscita"
