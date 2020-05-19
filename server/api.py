from uuid import UUID
import gevent
import sys
import zerorpc
from project import Project


class TextStudioAPI(object):
    def __init__(self):
        self.projects = []
        self.iters = 0

    def open_project(self, path):
        print('API loading project {}!'.format(path))
        project = Project(filepath=path)
        for openProject in self.projects:
            if openProject == project:
                print('Found project already open!')
                sys.stdout.flush()
                return openProject.toJson()

        self.projects.append(project)
        print('Opening new project!')
        sys.stdout.flush()
        return project.toJson()

    def load_dataset(self, id_string):
        # Load a dataset from a project
        id = UUID(id_string)
        instances = []
        project = self.projects[0]
        instances = project.load_dataset(id)
        return {'id': id_string, 'data': instances}

    def load_dataset_from_file(self, path):
        # Load a dataset from a file
        pass

    def load_dataset_mock(self, id_string):
        instances = [
            {"id": 0, "name": "Tev'n", "age": 28, "graduated": True},
            {"id": 1, "name": "Charlie", "age": 28, "graduated": False},
            {"id": 2, "name": "Jan", "age": 27, "graduated": False},
            {"id": 3, "name": "Amy", "age": 35, "graduated": True},
            {"id": 4, "name": "Mike", "age": 19, "graduated": False},
        ]
        return {'id': id_string, 'data': instances}

    @zerorpc.stream
    def _execute_module(self, settings):
        threads = [
                gevent.spawn(self.heartbeat),
                gevent.spawn(self._heartbeat, settings),
            ]
        for result in gevent.joinall(threads):
            for value in result.value:
                yield {"status": value, "complete": False}
        yield {"status": "Execution complete.", "complete": True}
        return

    def heartbeat(self):
        while self.iters < 5:
            gevent.sleep(1)
            self.iters += 1
            yield {"status": "heartbeat"}

    def _heartbeat(self, settings):
        response = {"status": "Failed to execute.", "complete": False}
        for i in range(10):
            response["status"] = "Executing {}".format(i)
            if i == 9:
                response["complete"] = True
            yield response
        return

    @zerorpc.stream
    def execute_module(self, settings):
        print('Executing module (api.py)...')
        sys.stdout.flush()
        foundMatch = False
        for project in self.projects:
            if project.id == settings['projectId']:
                for response in project.run(UUID(settings['moduleId']),
                                            UUID(settings['input']),
                                            UUID(settings['output'])):
                    settings['status'][response['id']] = response['status']
                    yield {
                      'id': settings['id'],
                      'moduleId': settings['moduleId'],
                      'status': settings['status'],
                      'complete': response['complete']
                    }
                    foundMatch = True
        sys.stdout.flush()
        if not foundMatch:
            yield {
                'id': settings['id'],
                'moduleId': settings['moduleId'],
                'status': settings['status'],
                'complete': True
            }
        return

    def tokenize(self, text):
        """split text on white space"""
        return text.split()

    def echo(self, text):
        """echo any text"""
        return text
