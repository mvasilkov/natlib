from pathlib import Path
import platform
import re
from subprocess import check_call, check_output

USE_SHELL = platform.system() == 'Windows'


def nop():
    pass


def node_app(binary: str | Path, version: tuple[str, str, str] | None = None):
    result = (nop,)

    if version is not None:
        version_option, version_pattern, version_value = version

        def node_app_check_available():
            try:
                result = check_output([binary, version_option], encoding='utf-8', shell=USE_SHELL)
            except FileNotFoundError:
                raise RuntimeError(f'Cannot run `{binary}` (FileNotFoundError)')

            version = re.match(version_pattern, result, re.MULTILINE)
            if version is None:
                raise RuntimeError(f'Cannot understand `{binary} {version_option}`, got {result!r}')

            version_tuple = tuple(version.group(1).split('.'))
            if version_tuple[0] != version_value:
                raise RuntimeError(f'Expected {binary} version {version_value}, got {version.group(1)!r}')

            return version_tuple

        result = (node_app_check_available,)

    def node_app_call(args: list):
        try:
            check_call([binary] + args, shell=USE_SHELL)
        except FileNotFoundError:
            raise RuntimeError(f'Cannot run `{binary}` (FileNotFoundError)')

    return result + (node_app_call,)


typescript_check_available, typescript_call = node_app('tsc', ('--version', 'Version (.+?)$', '4'))
