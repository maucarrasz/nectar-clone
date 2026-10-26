#!/bin/bash
# Activa los hooks de este repo en el clon actual. Ejecutar tras cada clon:
#   bash .githooks/install.sh
set -e
cd "$(git rev-parse --show-toplevel)"
git config core.hooksPath .githooks
echo "Hooks activos: core.hooksPath=$(git config core.hooksPath)"
