#!/usr/bin/env python3

from pathlib import Path
from shutil import rmtree

OUR_ROOT = Path(__file__).resolve().parents[1]


def run():
    out = OUR_ROOT / 'out'
    for path in out.iterdir():
        if path.name != 'natlib.js':
            if path.is_dir():
                rmtree(path)
            else:
                path.unlink()


if __name__ == '__main__':
    run()
