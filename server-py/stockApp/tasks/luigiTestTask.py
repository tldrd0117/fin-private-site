import luigi
import asyncio

class TestTask(luigi.Task):
    def run(self):
        print("Hello World!")

async def sleep():
    await asyncio.sleep(1)

class TestProgressTask(luigi.Task):
    @luigi.Task.event_handler(luigi.Event.SUCCESS)
    def celebrate_success(task):
        """Will be called directly after a successful execution
        of `run` on any Task subclass (i.e. all luigi Tasks)
        """
        print("We made it!")
    
    @luigi.Task.event_handler(luigi.Event.PROGRESS)
    def celebrate_progress(task, progress):
        """Will be called when the Task's progress changes.
        E.g., if the Task's `run` method calls `self.set_progress_percentage(10)`,
        this callback will be invoked with `progress=10`.
        """
        print("We're making progress: %s" % progress)

    @luigi.Task.event_handler(luigi.Event.FAILURE)
    def mourn_failure(task, exception):
        """Will be called directly after a failed execution
        of `run` on any JobTask subclass
        """
        print("We failed with exception %s" % exception)

    def run(self):
        # set status messages during the workload
        for i in range(10):
            # do some hard work here
            self.set_status_message("Progress: %d / 100" % i)
            asyncio.run(sleep())
            # displays a progress bar in the scheduler UI
            self.trigger_event(luigi.Event.PROGRESS, self, i)