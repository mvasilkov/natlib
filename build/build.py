#!/usr/bin/env python3

import json
from pathlib import Path
from shutil import copy2, copytree, rmtree
import sys

OUR_ROOT = Path(__file__).resolve().parents[1]
TSC_BINARY = OUR_ROOT / 'node_modules' / '.bin' / 'tsc'

# Make relative imports great again
if __name__ == '__main__' and not __package__:
    sys.path.insert(0, str(OUR_ROOT))
    __package__ = 'build'

from .typescript import typescript_call, typescript_check_available


def natlib_clean():
    package_dir = OUR_ROOT / 'out'
    if package_dir.is_dir():
        rmtree(package_dir)

    tsc_cache = OUR_ROOT / 'tsconfig.tsbuildinfo'
    if tsc_cache.is_file():
        tsc_cache.unlink()


def natlib_build():
    typescript_call(['--project', OUR_ROOT], binary=TSC_BINARY)


def natlib_package():
    package_dir = OUR_ROOT / 'out'

    contents = (
        ('typescript', 'typescript'),
        ('LICENSE', 'LICENSE'),
        ('README.md', 'README.md'),
        ('tsconfig.json', 'tsconfig.json'),
    )

    for path_str, target_str in contents:
        path = OUR_ROOT / path_str
        target_path = package_dir / target_str
        assert not target_path.exists()
        if path.is_dir():
            copytree(path, target_path)
        else:
            copy2(path, target_path)

    copy_package_json()


def copy_package_json():
    infile = OUR_ROOT / 'package.json'
    outfile = OUR_ROOT / 'out' / 'package.json'
    options = {
        'ensure_ascii': False,
        'allow_nan': False,
        'indent': 2,
    }
    content = json.loads(infile.read_text(encoding='utf-8'))
    del content['scripts']['prepublishOnly']
    del content['devDependencies']
    content_str = json.dumps(content, **options)
    if not content_str.endswith('\n'):
        content_str += '\n'
    outfile.write_text(content_str, encoding='utf-8', newline='\n')


if __name__ == '__main__':
    typescript_check_available(binary=TSC_BINARY)

    print('natlib: clean')
    natlib_clean()

    if sys.argv[1:] == ['clean']:
        sys.exit()

    print('natlib: build')
    natlib_build()

    print('natlib: package')
    natlib_package()
