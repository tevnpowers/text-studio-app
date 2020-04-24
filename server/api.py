from uuid import UUID
from project import Project


class TextStudioAPI(object):
    def __init__(self):
        self.projects = []

    def open_project(self, path):
        print('API loading project {}!'.format(path))
        project = Project(filepath=path)
        self.projects.append(project)
        return project.toJson()

    def load_dataset(self, id_string):
        id = UUID(id_string)
        instances = []
        project = self.projects[0]
        instances = project.load_dataset(id)
        return instances

    def load_dataset_from_file(self, path):
        pass

    def load_dataset_mock(self, id_string):
        instances = [
            {"id": 0, "name": "Tev'n", "age": 28, "graduated": True},
            {"id": 1, "name": "Charlie", "age": 28, "graduated": False},
            {"id": 2, "name": "Jan", "age": 27, "graduated": False},
            {"id": 3, "name": "Amy", "age": 35, "graduated": True},
            {"id": 4, "name": "Mike", "age": 19, "graduated": False},
        ]
        return instances

    def tokenize(self, text):
        """split text on white space"""
        return text.split()

    def echo(self, text):
        """echo any text"""
        return text
