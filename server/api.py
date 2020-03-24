from calculator.simple import SimpleCalculator


class TextStudioAPI(object):
    def __init__(self):
        self.calculator = SimpleCalculator()

    def calc(self, text):
        """based on the input text, return the int result"""
        try:
            self.calculator.run(text)
            return self.calculator.lcd
        except Exception as e:
            return 0.0

    def tokenize(self, text):
        """split text on white space"""
        return text.split()

    def echo(self, text):
        """echo any text"""
        return text
