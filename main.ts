import { mkdirSync, writeFileSync } from "node:fs";

// Two-line entry: line 1 explains one everyday thing to a 10-year-old
// through a single vivid analogy; line 2 says what that analogy maps
// and what it leaves out. Composed here, in this file, by the agent.
const LINES: string[] = [
  "A queue is a slow river of people, each person a pebble that the current nudges forward one small step at a time until the front of the line reaches the counter and each pebble is scooped out, one by one.",
  "The river shows why a queue moves in order and never overtakes itself, but it leaves out that people can choose to step aside, hurry, or give up their place, which water never does.",
];

const text: string = LINES.join("\n");

// Guards: exactly two lines, within the kit's 1-400 character gate,
// no trailing newline, no blank line, each line one sentence.
if (LINES.length !== 2) {
  throw new Error(`expected exactly 2 lines, got ${LINES.length}`);
}
if (text.split("\n").length !== 2) {
  throw new Error("entry must be exactly two lines");
}
if (text.length < 1 || text.length > 400) {
  throw new Error(`entry length ${text.length} outside 1-400 characters`);
}
if (text.trim() !== text) {
  throw new Error("entry must not start or end with whitespace");
}
for (const line of LINES) {
  if (line.trim() === "") {
    throw new Error("entry line must not be blank");
  }
  if (!line.endsWith(".")) {
    throw new Error("each entry line must be one sentence ending with a period");
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
