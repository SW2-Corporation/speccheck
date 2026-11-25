# UCn Titolo del caso d'uso

## Diagramma


```mermaid
usecase-beta
direction LR
actor AttorePrincipale
systemBoundary "Nome del sistema"
  UCn("UCn Titolo del caso d'uso")
end
AttorePrincipale -- UCn
```

## Descrizione

- Attore principale: Nome dell'attore.
- Attori secondari: Nessuno.
- Precondizioni: stato vero prima dell'inizio, che il caso d'uso non controlla.
- Postcondizioni: stato vero alla fine dello scenario principale.

## Scenario principale

1. L'Attore principale chiede di …
2. Il sistema …

## Scenari alternativi

- **2a.** Se …, il sistema … Il caso d'uso riprende dal passo 2.
- **na.** Se …, il sistema … Punto di estensione «nome». Il caso d'uso termina ….

## Relazioni

- Include UCm Titolo, al passo n.
- È esteso da UCk Titolo, nel punto di estensione «nome» (passo na), se ….
- L'Attore è un Attore più generale: generalizzazione tra attori.

## Termini

- **Termine**: definizione.
