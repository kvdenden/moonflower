#!/bin/sh
set -e  # Exit immediately if a command exits with a non-zero status.

yarn typeorm migration:run
