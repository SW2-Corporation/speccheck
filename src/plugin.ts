// Plugin di SpecCheck per OpenCode 2.
// Per ora registra solo lo strumento speccheck_stato, che conferma il caricamento.

import { Plugin } from "@opencode/plugin";
import { VERSIONE, descriviStato } from "./stato.ts";

export default Plugin.define({
  id: "speccheck",
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      editor.add({
        name: "speccheck_stato",
        description: "Riporta la versione di SpecCheck e la cartella del progetto. Serve a controllare che il plugin sia caricato.",
        input: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        async execute() {
          return {
            content: descriviStato({ versione: VERSIONE, cartella: ctx.location.directory }),
          };
        },
      });
    });
  },
});
