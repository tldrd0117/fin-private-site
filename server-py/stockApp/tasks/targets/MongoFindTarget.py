from luigi.contrib.mongodb import MongoTarget
from pymongo import InsertOne, DeleteMany, ReplaceOne, UpdateOne


class MongoFindTarget(MongoTarget):

    """ Target for a level 0 field in a range of documents """

    def __init__(self, mongo_client, index, collection, document_ids, field):
        """
        :param document_ids: targeted mongo documents
        :type documents_ids: list of str
        :param field: targeted field in documents
        :type field: str
        """
        super(MongoFindTarget, self).__init__(mongo_client, index, collection)

        self._document_ids = document_ids
        self._field = field

    def exists(self):
        """
        Test if target has been run
        Target is considered run if the targeted field exists in ALL documents
        """
        return not self.get_empty_ids()

    def read(self):
        """
        Read the targets value
        """
        cursor = self.get_collection().find(
            {
                '_id': {'$in': self._document_ids},
                self._field: {'$exists': True}
            },
            {self._field: True}
        )

        return {doc['_id']: doc[self._field] for doc in cursor}

    def write(self, values):
        """
        Write values to the targeted documents
        Values need to be a dict as : {document_id: value}
        """
        # Insert only for docs targeted by the target
        filtered = {_id: value for _id, value in values.items() if _id in self._document_ids}

        if not filtered:
            return
        
        targets = [ 
            UpdateOne({'_id': _id}, {'$set': {self._field: value}}, upsert=True)
            for _id, value in filtered.items()
        ]
        self.get_collection().bulk_write(targets)

    def get_empty_ids(self):
        """
        Get documents id with missing targeted field
        """
        cursor = self.get_collection().find(
            {
                '_id': {'$in': self._document_ids},
                self._field: {'$exists': True}
            },
            {'_id': True}
        )

        return set(self._document_ids) - {doc['_id'] for doc in cursor}

