// Pinned official H-MEM, plus a narrow application approval boundary.
// Reference retrieval uses deterministic hash embeddings, not an embedding API.
import { HMEM } from './vendor/hmem/reference/src/index.ts';
export { HMEM };

export class ResearchMemory {
  engine: HMEM;
  constructor(directory: string) {
    this.engine = new HMEM({ persistDir: directory, actor: 'chainthread' });
  }
  confirm(input: { approved: boolean; content: string; source: string;
    confidence: number; supersedes?: string }) {
    if (input.approved !== true) throw new Error('Human confirmation required');
    if (!input.source?.trim() || !input.content?.trim()) throw new Error('Content and source required');
    if (!Number.isFinite(input.confidence) || input.confidence < 0 || input.confidence > 1)
      throw new Error('Confidence must be between 0 and 1');
    if (input.supersedes && !this.engine.store.get(input.supersedes))
      throw new Error('Unknown previous version');
    const memory = this.engine.add({ content: input.content, source: input.source,
      confidence: input.confidence, type: 'factual', layer: 'long_term',
      supersedes: input.supersedes,
      provenance: { origin: 'manual', learnedAt: Date.now(), label: 'Confirmed research note', refs: [input.source] } });
    if (input.supersedes) this.engine.store.update(input.supersedes, { supersededBy: memory.id });
    return memory;
  }
  recall(question: string) {
    const result = this.engine.query(question);
    this.engine.store.persist();
    // Keep the engine's trace, but never inject an old version as an unlabeled current note.
    const context = result.memories.map(({memory: m}) =>
      `[${m.id}; ${m.supersededBy ? 'HISTORICAL, replaced by '+m.supersededBy : 'CURRENT'}; source=${m.source}] ${m.content}`
    ).join('\n');
    return { ...result, context };
  }
}
