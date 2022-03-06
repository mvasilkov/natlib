#!/usr/bin/env python3

from contextlib import contextmanager, ExitStack
import json
from pathlib import Path
import re
from shutil import copy2, copytree, rmtree
from subprocess import check_call, check_output
import sys

OUR_ROOT = Path(__file__).resolve().parents[1]

USE_SHELL = sys.platform == 'win32'

JSON_OPTIONS = {
    'ensure_ascii': False,
    'allow_nan': False,
    'indent': 2,
}


def tsc_check_available():
    try:
        result = check_output(
            ['tsc', '--version'],
            shell=USE_SHELL,
            encoding='utf-8',
        )
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
    if cache.is_file():
        cache.unlink()

    examples = OUR_ROOT / 'examples'
    for path in examples.iterdir():
        if not path.is_dir():
            continue
        node_modules = path / 'node_modules'
        if node_modules.is_dir():
            rmtree(node_modules)

    for path in examples.glob('**/*.js'):
        if path.with_suffix('.ts').is_file():
            path.unlink()


@contextmanager
def create_symlink(path: Path):
    node_modules = path / 'node_modules'
    node_modules.mkdir()
    (node_modules / 'natlib').symlink_to(OUR_ROOT / 'out', target_is_directory=True)

    try:
        yield
    finally:
        rmtree(node_modules)


def build():
    examples = OUR_ROOT / 'examples'

    projects = (
        ('..', False),
        ('couch2048', True),
    )

    for path_str, need_symlink in projects:
        path = examples / path_str

        with ExitStack() as stack:
            if need_symlink:
                stack.enter_context(create_symlink(path))

            try:
                check_call(['tsc', '--project', path], shell=USE_SHELL)
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
