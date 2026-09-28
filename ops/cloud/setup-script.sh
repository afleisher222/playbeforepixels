#!/bin/bash
# Paste this into the "Play Before Pixels" cloud environment: environment menu → Edit → Setup script.
# It runs once, the result is cached for about 7 days, and it must finish in about 5 minutes.
# Playwright and Chromium already ship with the cloud image; fonts are in the repository.
pip install -q fonttools==4.66.0 uharfbuzz==0.56.2 brotli==1.2.0 pymupdf==1.28.2 numpy==2.4.6 openpyxl==3.1.5 pillow==12.3.0 \
  || pip install -q --break-system-packages fonttools==4.66.0 uharfbuzz==0.56.2 brotli==1.2.0 pymupdf==1.28.2 numpy==2.4.6 openpyxl==3.1.5 pillow==12.3.0 \
  || true
exit 0
