#!/usr/bin/env python3
"""Stamp 300 dpi into every print PNG of this product (same method as merch-core/build/set_dpi.py)."""
import glob, os, sys
PROD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(PROD, '..', 'merch-core', 'build'))
import importlib.util
spec = importlib.util.spec_from_file_location('sd', os.path.join(PROD, '..', 'merch-core', 'build', 'set_dpi.py'))
src = open(spec.origin).read().split('files = glob.glob')[0]   # reuse stamp() only
ns = {'__file__': spec.origin}
exec(src, ns)
files = glob.glob(os.path.join(PROD, 'print', '**', '*.png'), recursive=True)
for f in files:
    ns['stamp'](f)
print('300 dpi stamped on', len(files), 'PNGs')
