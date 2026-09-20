import { writeFileSync } from "node:fs";

// Chunkier 5×7 LED glyphs (closer to stadium-matrix weight)
const letters = {
  M: ["10001", "11011", "10101", "10001", "10001", "10001", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  D: ["11100", "10010", "10001", "10001", "10001", "10010", "11100"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
};

const word = "MARIDOTS";
const letterW = 5;
const letterH = 7;
const gap = 1;
const padX = 5;
const padY = 4;

const contentCols = word.length * letterW + (word.length - 1) * gap;
const cols = contentCols + padX * 2;
const rows = letterH + padY * 2;

const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

word.split("").forEach((ch, i) => {
  const glyph = letters[ch];
  const ox = padX + i * (letterW + gap);
  for (let r = 0; r < letterH; r++) {
    for (let c = 0; c < letterW; c++) {
      if (glyph[r][c] === "1") grid[padY + r][ox + c] = 1;
    }
  }
});

const pitch = 16;
const radius = 5.2;
const marginX = 36;
const marginTop = 32;
const marginBottom = 56;
const gridW = (cols - 1) * pitch;
const gridH = (rows - 1) * pitch;
const width = gridW + marginX * 2;
const height = gridH + marginTop + marginBottom;

const off = "#1e293b";
const bg = "#0f172a";

function onColor(col) {
  const t = col / Math.max(cols - 1, 1);
  if (t < 0.38) return "#38bdf8";
  if (t < 0.62) return "#0ea5e9";
  return "#0284c7";
}

let dots = "";
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const cx = marginX + col * pitch;
    const cy = marginTop + row * pitch;
    const on = grid[row][col] === 1;
    dots += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${on ? onColor(col) : off}" opacity="${on ? 1 : 0.5}"/>\n`;
  }
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Maridots — Compliance and Risk Management">
  <title>Maridots</title>
  <desc>LED-style dot matrix spelling MARIDOTS with slogan Compliance and Risk Management</desc>
  <rect width="100%" height="100%" fill="${bg}"/>
  ${dots}
  <text x="${width / 2}" y="${marginTop + gridH + 38}" text-anchor="middle" fill="#94a3b8" font-family="ui-sans-serif, system-ui, 'Segoe UI', sans-serif" font-size="12" font-weight="600" letter-spacing="0.32em">COMPLIANCE AND RISK MANAGEMENT</text>
</svg>
`;

writeFileSync("public/assets/maridots-dotmatrix.svg", svg);
console.log(`wrote public/assets/maridots-dotmatrix.svg (${width}×${height}, ${cols}×${rows} dots)`);
