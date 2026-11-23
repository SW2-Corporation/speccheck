import { test } from "node:test";
import assert from "node:assert/strict";
import { descriviStato } from "../src/stato.ts";

test("descriviStato riporta versione e cartella", () => {
  assert.equal(
    descriviStato({ versione: "1.2.3", cartella: "/progetti/prova" }),
    "SpecCheck 1.2.3 attivo in /progetti/prova",
  );
});
