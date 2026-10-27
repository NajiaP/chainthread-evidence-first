# Nightshift status and remaining options

Checked 28 October 2026, Beijing time. This document records research, not an implemented integration.

## What is confirmed

The current demo calls NVIDIA directly. It does not route application requests through Nightshift.

Meterless's [CLI guide](https://meterless.ai/cli.html#install) distinguishes the editions: Web and Mac M1-M4 use the cockpit without an external application endpoint or ns CLI. Windows, DGX Spark and Mac M5+ editions provide a Runtime endpoint. The [Mac page](https://meterless.ai/mac.html) specifies M5 or later for the full edition and points earlier Macs to the free M1+ edition. The builder has only an M2 Mac.

Our earlier local test found an 8088 listener but an empty JSON body from GET /v1/models. This does not establish a usable model API. A cockpit test marked a job completed but exposed no answer text. Neither test counts as successful integration. Later direct NVIDIA calls returned actual model text.

The captured Power lesson in the [official course](https://academy.genai.works/courses/open-agent-hackathon-2026) says the app must support Nightshift as a primary AI provider. Its exact deep-link ID was not verified. The captured text lives in the feasibility evidence batch. Nemotron through Nightshift is separately required for the NVIDIA award.

## Remaining options

1. **A remote host with the full Runtime.** A compatible Windows, M5+ or DGX machine could run Nightshift. Routing the M2 application's requests through a secured connection to that host is a possible architecture. It has not been provisioned, tested or approved by the organizer for this entry. No public endpoint should be exposed merely to satisfy a demo.
2. **An official compatibility path or organizer-provided runtime.** Ask Meterless or the organizer whether there is a supported cloud-only Runtime or special M2 build for this hackathon. We found no documented, verified route for the current machine. Absence from the pages checked is not proof that no such route exists.
3. **Organizer acceptance of a manual cockpit workflow.** Exporting a prompt and importing a cockpit result is technically different from the app sending requests to Nightshift. It would need explicit organizer acceptance. It is not implemented and is not described as compliance.

Installing an unsupported edition, inventing a local proxy with the Nightshift name, or showing a cosmetic dependency would not establish the required integration. A Windows VM on this M2 and running the DGX package in a container were not tested and are not ready alternatives.

## Submission wording

> This prototype uses real Zetaris query data, the official H-MEM reference adaptation and live NVIDIA Nemotron calls. Model calls currently go directly to NVIDIA. Nightshift is not integrated, so we cannot claim that this submission meets the published Nightshift requirement or qualifies for the NVIDIA award.

No feature, provider or app behavior was changed while preparing the submission materials. No message has been sent to the organizer on the builder's behalf.
