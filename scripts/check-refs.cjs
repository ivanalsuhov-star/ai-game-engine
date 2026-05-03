// Парсит .ts файлы регулярками и ищет битые ссылки между handbook и tasks
const fs = require('fs');
const path = require('path');
const handbookDir = path.join(__dirname, '../lib/handbook');
const tasksDir = path.join(__dirname, '../lib/tasks');

function readAll(dir) {
  return fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts')
    .map(f => fs.readFileSync(path.join(dir, f), 'utf-8')).join('\n');
}
const handbookSrc = readAll(handbookDir);
const tasksSrc = readAll(tasksDir);

const handbookIds = new Set([...handbookSrc.matchAll(/^\s*id:\s*"([^"]+)"/gm)].map(m => m[1]));
const taskIds = new Set([...tasksSrc.matchAll(/^\s*id:\s*"([^"]+)"/gm)].map(m => m[1]));
console.log(`handbook ids: ${handbookIds.size}, task ids: ${taskIds.size}`);

// extract relatedTaskIds blocks
let broken = 0;
const relRegex = /relatedTaskIds:\s*\[([^\]]+)\]/g;
let m;
while ((m = relRegex.exec(handbookSrc)) !== null) {
  const ids = [...m[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);
  for (const id of ids) {
    if (!taskIds.has(id)) { console.log('handbook→task BROKEN:', id); broken++; }
  }
}
const relHbRegex = /relatedHandbookTopics:\s*\[([^\]]*)\]/g;
while ((m = relHbRegex.exec(tasksSrc)) !== null) {
  const ids = [...m[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);
  for (const id of ids) {
    if (!handbookIds.has(id)) { console.log('task→handbook BROKEN:', id); broken++; }
  }
}
console.log(`\nTotal broken: ${broken}`);
