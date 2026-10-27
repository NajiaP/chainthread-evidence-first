# ChainThread

A local Ethereum research desk that remembers the evidence standard you approved.

**Track:** Solving Fragmented Intelligence (Track 1, intended submission).  
**Builder:** Najia Pan.  
**Coding tool:** OpenAI Codex. Cursor was used during earlier data setup.  
**Status:** Working local prototype. Real Zetaris query snapshot, live NVIDIA Nemotron calls, official H-MEM reference adaptation and explicit human review. **Nightshift is not integrated.**

## The problem and the narrow solution

An analyst puts an Ethereum investigation aside because several transfers do not establish a sustained relationship. When they return, the transactions alone do not explain what evidence they previously considered sufficient.

ChainThread saves the analyst's expressed note and qualitative evidence standard after confirmation. It retrieves that record for the next model check, lets the analyst inspect transaction citations, and preserves a confirmed revision without deleting the previous judgment. A review can retain the original conclusion.

“Remembering reasoning” here means user-expressed notes, standards and revisions. It does not mean revealing a model's hidden chain of thought. We have not shown that ChatGPT Projects cannot do the same reasoning. The proposed value is less preparation and a more reviewable handoff, which still needs a study with real analysts.

## Recorded demonstration

[Watch the 3:50 English demo](https://iframe.mediadelivery.net/embed/778121/2129298c-cbd2-4a5c-a1b5-a46e9f7df9d5) · [English subtitles](ChainThread_Demo_EN.srt) · [Actual narration transcript](VIDEO_TRANSCRIPT_EN.md). Actual UI recording with synthetic English narration, including the real model response and human correction. A 15-second final frame hold completes the disclosure; model waiting time is not cut. Nightshift is not integrated.

[Pitch deck](https://hackathon-server.genai.works/api/v1/cdn/proxy/hackathon/948f0c14273d4ad0b86a50fc7bf692e0.pdf) · [Nightshift status](NIGHTSHIFT_STATUS_EN.md)

## Quick start

Requires Node.js 24 and network access to NVIDIA for live AI checks. No npm installation is needed for the included H-MEM reference.

```sh
sh src/chainthread-demo/run.sh
```

Open **http://127.0.0.1:8828/**. If Node is not on PATH, set `CHAINTHREAD_NODE` to your Node 24 executable. The author's absolute runtime path in the script is a local fallback, not a requirement for other users.

1. Enter a full NVIDIA API key in the local page's password field and save the connection. The tested model is `nvidia/nemotron-3.5-lightning-30b-a3b` at `https://integrate.api.nvidia.com/v1`. Availability and limits depend on the NVIDIA account.
2. Write or edit the sample research note and evidence standard.
3. Tick the confirmation checkbox, then save to H-MEM.
4. Inspect the five transactions, original SQL and query timestamp. Transaction hashes link to Etherscan for inspection. These links do not import identity labels.
5. Run the evidence check. The server sends the real transaction rows and H-MEM context to Nemotron. There is no template-answer fallback.
6. Read the AI draft and its limitations. Edit your note, explicitly confirm again, and inspect the new version and supersedes relationship.
7. Refresh the page. The saved versions persist. Rerun the check to use the revised note. Export the research record as JSON.

The interface opens in English and has a Chinese toggle. User-written notes and generated answer text keep their original language. A new model check uses the selected interface language.

## What the integrations actually do

| Component | Implemented contribution | Boundary |
|---|---|---|
| Zetaris | A real local SQL query against `AWS_BLOCKCHAIN_S3.eth_transactions` returned five rows. The app reads that result and exposes its SQL and timestamp. | Historical query snapshot, not a fresh query per click or a live alert service. |
| H-MEM | The app imports the official reference `HMEM` class. Confirmed notes enter long-term memory with source and confidence. New server instances retrieve persisted context. Revisions retain both records and supersedes/supersededBy lineage. | Reference hash embeddings and local JSON persistence. Not production semantic retrieval. Human confirmation is an application boundary, not a claim that ordinary review implements the entire dreaming lifecycle. |
| NVIDIA Nemotron | Real chat-completions calls compare the supplied evidence with the retrieved standard and return a draft with transaction citations, a next check and limitations. | Calls go directly to NVIDIA. Model interpretation still requires human review. |
| Human reviewer | Confirms the standard, checks the evidence and explicitly saves the final note or revision. | AI output never automatically becomes a confirmed judgment. The included test review is a demonstration, not Najia's personal research conclusion. |

H-MEM source: [Meterless/Meterless](https://github.com/Meterless/Meterless), pinned commit `1742dec56a66e58eef9dda2d2b865823758ca8cd`. The bundled reference retains its Apache-2.0 license and provenance. We adapted it with a narrow approval and revision wrapper rather than claiming an original memory engine.

## The real data example

- Ethereum sender: `0x3a6308bf8eb87cd55ee2c1be741e41ef15d5193f`.
- Partition: `2026-09-01`, all timestamps UTC.
- Loaded baseline: 08:00 inclusive to 12:00 exclusive. Two successful positive direct transfers to two recipients.
- Observation: 12:00 inclusive to 18:00 inclusive. Three successful positive direct transfers to two recipients absent from that baseline.
- Recipient `0x4db0bc41768f5eb844cbce68f13ca62f6b9baca5` received transfers at 12:15:35 and 12:56:35, 41 minutes apart.
- Query completed on `2026-10-27T22:07:07.065565Z`, taking approximately 228 seconds. The snapshot avoids repeating that delay during every interaction.

“Absent from the baseline” does not mean new to Ethereum. This table does not establish recipient identity, transfer purpose, token sales or a sustained relationship. `receipt_status=1` comes from the loaded table. Values inherit the source's floating-point representation and are approximate, not accounting-grade wei values. Internal transactions and token transfers are outside this example.

## Checks and observed limitations

The pinned H-MEM conformance runner passed **13/13 checks**. Six additional application persistence checks passed, including rejecting unconfirmed writes and missing sources, retaining revision lineage, and retrieving the current record in a new process.

```sh
node --experimental-transform-types src/chainthread-feasibility/test_memory.ts /tmp/chainthread-memory-test.json
HMEM_IMPL="$PWD/src/chainthread-feasibility/index.ts" node --experimental-transform-types src/chainthread-feasibility/vendor/hmem/conformance/runner.ts
```

Browser verification covered confirmation, a real model response, a second confirmed version, refresh recovery and reinjection of the revised memory. Export inspection found no API key. The app rejects unknown transaction citations and malformed responses. Citation existence is not semantic correctness: an earlier model draft incorrectly assigned the 12:05:11 transfer to the baseline. We retained and annotated it, then supplied explicit window labels and deterministic counts. A subsequent real response used the correct 2/3 split. The recorded demonstration also contains a later model error claiming the repeated recipient appeared in both windows. Both transfers are actually in the observation window. The reviewer corrects this and explicitly saves the revised note. These observed errors reinforce the need for human review. This is a narrow test, not an accuracy benchmark.

## Files and private state

- `src/chainthread-demo/`: server, interface and launcher.
- `src/chainthread-feasibility/index.ts`: H-MEM approval/revision wrapper.
- `src/chainthread-feasibility/vendor/hmem/`: pinned official reference and conformance suite.
- `docs/hackathon/lifechain/evidence/2026-10-27-feasibility/zetaris-live.json`: real query, rows and completion time.

The app creates `src/chainthread-demo/.local/`. Its private provider file uses mode 0600 and is excluded from the source package and exports. Never publish `.local`, `.env`, credentials, browser state or account screenshots. The API listens on loopback only. This is a single-user local prototype with no production availability or multi-user isolation claim.

## Competition disclosure

**The application currently does not support Nightshift as its primary AI provider.** This is a known deviation from the published Power requirement. Direct Nemotron use does not satisfy a requirement to use Nemotron through Nightshift, and does not establish NVIDIA award eligibility. We do not claim full competition compliance. The submitter must obtain organizer guidance or accept this unresolved limitation.

Earlier Lifechain/ChainThread planning and offline HTML prototypes predate this integration build. The current local application adds actual data consumption, direct NVIDIA calls, official H-MEM persistence and human review. Earlier static prototypes uploaded to the existing repository are preserved under `legacy-prototypes/` for reference. They use synthetic data and do not demonstrate the integrations described above. The older root `index.html` and `graph-mock.html` are also legacy static prototypes; the current application starts with the Node command above. The repository previously published those prototypes; the HackOS entry inspected during this audit is a draft, not a completed submission.

## Reproducing the Zetaris evidence

The included snapshot allows the application to run without installing Zetaris on a reviewer’s machine. To rerun the underlying query, install the [official Zetaris getting-started stack](https://github.com/zetaris/getting-started), load its official blockchain recipe and the `2026-09-01` Ethereum partition, then run the exact `sql` string stored in `zetaris-live.json` against your local instance. Do not substitute a freshly fetched explorer result for the included query. The local Zetaris driver was running during query capture. The UI itself does not query it on every check.

## Proposed next validation, outside this build

Observe an analyst's existing report workflow, then compare ChainThread and Project with the same natural materials and queries. Measure preparation effort, repeated checks, accepted corrections and review time, including any friction introduced by confirmation. This study has not been completed. Broader publication checking, exchange labels and cross-platform ingestion remain future work.
