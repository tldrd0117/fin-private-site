import mongoClient

def test_mongoConnection():
    databases = mongoClient.getClient().list_database_names()
    compareTarget = ["admin", "config", "local"]
    for t in compareTarget:
        assert t in databases

def test_collection():
    # In MongoDB, a collection is not created until it gets content!
    collection = mongoClient.getCollection("collect", "test")
    count = collection.count_documents({})
    print("count", count)
    if count == 0:
        collection.insert_one({"test": "test"}) 
    databases = mongoClient.getClient().list_database_names()
    compareTarget = ["admin", "config", "local", "collect"]
    for t in compareTarget:
        assert t in databases