from typing import Callable, Dict, List

_subs: Dict[str, List[Callable]] = {"on_file_upload": []}


def subscribe(event: str, fn: Callable):
    _subs.setdefault(event, []).append(fn)


def publish(event: str, payload: dict):
    for fn in _subs.get(event, []):
        try:
            fn(payload)
        except Exception:
            pass


# Example: stub handler that Module 2 will replace
def _log_handler(payload: dict):
    print("[on_file_upload] queued:", payload)


subscribe("on_file_upload", _log_handler)
