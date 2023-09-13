
import luigi
from luigi.contrib.mongodb import MongoTarget, MongoCellTarget


class MongoTestTask(luigi.Task):
    def requires(self):
        return None

    def run(self):
        print("MongoTestTask")

    def output(self):
        return MongoCellTarget()