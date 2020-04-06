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

    def tokenize(self, text):
        """split text on white space"""
        return text.split()

    def echo(self, text):
        """echo any text"""
        return text
