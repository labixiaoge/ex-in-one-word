// Describe Your Ex in One Word
// program/v1 entry: writes a single one-word verdict on an ex
// to <output dir>/entry.txt (MAKEFUN_OUTPUT_DIR, default /output).
// Deterministic, no network, no input: the same word on every run.
// The file holds exactly the word — no trailing newline — so the
// gate sees 9 characters of plain UTF-8 text, a single word with
// nothing else attached.
//
// The word: Clearance. The ex as clearance-rack stock — marked
// down, picked over, and nobody wanted them at full price.
// Double meaning: "clearance" is both the bargain bin and being
// cleared out of your life for good.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Clearance";

// Guardrails: the entry must be exactly one word — a single line,
// alphabetic only, no spaces or punctuation, within a sane length.
if (!/^[A-Za-z]+$/.test(WORD)) {
  console.error("entry must be a single alphabetic word, got:", JSON.stringify(WORD));
  process.exit(1);
}
if (WORD.length < 1 || WORD.length > 20) {
  console.error(`entry length ${WORD.length} out of bounds (1-20)`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, WORD, "utf8");

// Verify what landed on disk is byte-for-byte the intended word.
if (readFileSync(outPath, "utf8") !== WORD) {
  console.error("written entry does not match expected word");
  process.exit(1);
}
