from bson import ObjectId


def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "FastAPI CV Backend is running!"}


def test_get_profile_found(client, fake_db):
    fake_db.profile.document = {"_id": ObjectId("69e778f343c37cdc20de60a2"), "name": "Jane Doe"}

    response = client.get("/api/profile")

    assert response.status_code == 200
    body = response.json()
    assert body["name"] == "Jane Doe"
    assert body["_id"] == "69e778f343c37cdc20de60a2"


def test_get_profile_not_found(client, fake_db):
    fake_db.profile.document = None

    response = client.get("/api/profile")

    assert response.status_code == 404


def test_get_cv_returns_requested_language(client, fake_db):
    fake_db.cv.document = {
        "_id": ObjectId(),
        "content": {
            "de": {"hero": {"name": "Max Mustermann"}},
            "en": {"hero": {"name": "John Doe"}},
        },
    }

    response = client.get("/api/cv", params={"lang": "en"})

    assert response.status_code == 200
    assert response.json() == {"hero": {"name": "John Doe"}}


def test_get_cv_falls_back_to_german_for_unknown_language(client, fake_db):
    fake_db.cv.document = {
        "_id": ObjectId(),
        "content": {"de": {"hero": {"name": "Max Mustermann"}}},
    }

    response = client.get("/api/cv", params={"lang": "fr"})

    assert response.status_code == 200
    assert response.json() == {"hero": {"name": "Max Mustermann"}}


def test_get_cv_legacy_document_without_content_key(client, fake_db):
    fake_db.cv.document = {"_id": ObjectId(), "hero": {"name": "Legacy Name"}}

    response = client.get("/api/cv")

    assert response.status_code == 200
    assert response.json() == {"hero": {"name": "Legacy Name"}}


def test_get_cv_not_found(client, fake_db):
    fake_db.cv.document = None

    response = client.get("/api/cv")

    assert response.status_code == 404
