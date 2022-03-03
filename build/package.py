#!/usr/bin/env python3

import json
from pathlib import Path
import re
from shutil import copy2, copytree, rmtree
from subprocess import check_call, check_output

OUR_ROOT = Path(__file__).resolve().parents[1]

JSON_OPTIONS = {
    'ensure_ascii': False,
    'allow_nan': False,
    'indent': 2,
}


def tsc_check_available():
    try:
        result = check_output(['tsc', '--version'], encoding='utf-8')
    except FileNotFoundError:
        raise RuntimeError('Cannot run tsc')

    version = re.match(r'Version (.+?)$', result, re.MULTILINE)
    if version is None:
        raise RuntimeError(f'Cannot understand tsc, got {result!r}')

    version_tuple = tuple(version.group(1).split('.'))
    if version_tuple[0] != '4':
        raise RuntimeError(f'Expected tsc version 4, got {version.group(1)!r}')

    return version_tuple


def clean():
    package_root = OUR_ROOT / '_natlib'
    if package_root.is_dir():
        rmtree(package_root)

    out = OUR_ROOT / 'out'
    for path in out.iterdir():
        if path.name != 'natlib.js':
            if path.is_dir():
                rmtree(path)
            else:
                path.unlink()

    cache = OUR_ROOT / 'tsconfig.tsbuildinfo'
    if cache.exists():
        cache.unlink()


def build():
    try:
        check_call(['tsc', '--project', OUR_ROOT])
    except FileNotFoundError:
        raise RuntimeError('Cannot run tsc')


def package():
    package_root = OUR_ROOT / '_natlib'

    contents = (
        ('out', ''),
        ('examples', 'examples'),
        ('typescript', 'typescript'),
        ('LICENSE', 'LICENSE'),
        ('README.md', 'README.md'),
        ('tsconfig.json', 'tsconfig.json'),
    )

    for path_str, target_str in contents:
        path = OUR_ROOT / path_str
        target_path = package_root / target_str
        if path.is_dir():
            copytree(path, target_path)
        else:
            copy2(path, target_path)

    package_str = (OUR_ROOT / 'package.json').read_text(encoding='utf-8')
    package_json = json.loads(package_str)
    del package_json['scripts']['prepublishOnly']
    package_str = json.dumps(package_json, **JSON_OPTIONS)
    (package_root / 'package.json').write_text(package_str, encoding='utf-8')


def run():
    tsc_check_available()

    print('natlib: clean()')
    clean()

    print('natlib: build()')
    build()

    print('natlib: package()')
    package()


if __name__ == '__main__':
    run()
