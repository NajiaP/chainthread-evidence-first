#!/bin/sh
set -eu
cd "$(dirname "$0")/../.."
chain_node="${CHAINTHREAD_NODE:-$(command -v node || true)}"
if [ -z "$chain_node" ]; then chain_node='/Users/najiapan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node'; fi
exec "$chain_node" --experimental-transform-types src/chainthread-demo/server.ts
