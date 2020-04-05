from project import Project


class TextStudioAPI(object):
    def open_project(self, path):
        print('API loading project {}!'.format(path))
        project = Project(filepath=path)
        return project.toJson()

    def tokenize(self, text):
        """split text on white space"""
        return text.split()

    def echo(self, text):
        """echo any text"""
        return text
