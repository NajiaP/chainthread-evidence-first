import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { ResearchMemory } from './index.ts';

const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'chainthread-memory-test-'));
const memory = new ResearchMemory(directory);
// Explicit fixtures, not a claim about a real user's previously confirmed beliefs.
const content = 'Ethereum research baseline: new recipients mean absent from the loaded baseline, not new to the blockchain.';
assert.throws(() => memory.confirm({ approved: false, content, source: 'fixture:confirmation', confidence: 1 }));
assert.equal(memory.engine.store.all().length, 0);
assert.throws(() => memory.confirm({ approved: true, content, source: '', confidence: 1 }));
const old = memory.confirm({ approved: true, content, source: 'fixture:confirmation-v1', confidence: 1 });
const current = memory.confirm({ approved: true, content: content + ' Repeated transfers do not establish a sustained relationship.',
  source: 'fixture:confirmation-v2', confidence: 1, supersedes: old.id });
assert.equal(memory.engine.store.get(old.id)?.supersededBy, current.id);
assert.equal(memory.engine.store.all().length, 2);
const child = spawnSync(process.execPath, ['--experimental-transform-types', '--input-type=module', '-e',
  `import {ResearchMemory} from ${JSON.stringify(new URL('./index.ts', import.meta.url).href)};
   const m=new ResearchMemory(${JSON.stringify(directory)});
   console.log(JSON.stringify({result:m.recall(${JSON.stringify(content)}), records:m.engine.store.all(), ledger:m.engine.ledger.stats()}));`], { encoding: 'utf8' });
assert.equal(child.status, 0, child.stderr);
const reloaded = JSON.parse(child.stdout);
assert.equal(reloaded.records.length, 2);
assert.equal(reloaded.result.memories[0].memory.id, current.id);
assert.ok(reloaded.result.context.includes('sustained relationship'));
assert.ok(reloaded.result.trace.retrievalReason);
assert.ok(reloaded.ledger.create === 2 && reloaded.ledger.update >= 1 && reloaded.ledger.read >= 1);
const output = { status: 'PASS', checks: ['unconfirmed write rejected', 'missing source rejected',
  'confirmed write persisted', 'revision retains old record and lineage', 'new process loads current version first',
  'retrieval context and audit trace available'], fixture: true, temporaryStore: directory, currentId: current.id,
  context: reloaded.result.context, trace: reloaded.result.trace, ledger: reloaded.ledger };
if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify(output, null, 2));
console.log(JSON.stringify(output, null, 2));
