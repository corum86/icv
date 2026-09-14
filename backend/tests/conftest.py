import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import pytest
from fastapi.testclient import TestClient

import main


class FakeCollection:
    def __init__(self, document=None):
        self.document = document

    async def find_one(self, *_args, **_kwargs):
        return self.document


class FakeDB:
    def __init__(self, profile=None, cv=None):
        self.profile = FakeCollection(profile)
        self.cv = FakeCollection(cv)


@pytest.fixture
def fake_db(monkeypatch):
    db = FakeDB()
    monkeypatch.setattr(main, "db", db)
    return db


@pytest.fixture
def client(fake_db):
    return TestClient(main.app)
