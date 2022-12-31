from pathlib import Path
import platform
from subprocess import check_call

USE_SHELL = platform.system() == 'Windows'


def michikoid_call(args: list, binary: str | Path = 'michikoid'):
    try:
        check_call([binary] + args, shell=USE_SHELL)
    except FileNotFoundError:
        raise RuntimeError('Cannot run `michikoid` (FileNotFoundError)')
