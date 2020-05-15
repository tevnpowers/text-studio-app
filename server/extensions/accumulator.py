from collections import defaultdict
from text_studio.annotator import Annotator


class Accumulator(Annotator):
    def __init__(self, *, id, name, keys, annotations):
        self.id = id
        self.name = name
        self.keys = keys
        self.annotations = annotations

    def process_single(self, document):
        return {
            self.annotations[0]["value"]: document[self.keys[0]["value"]],
            self.annotations[1]["value"]: document[self.keys[1]["value"]],
        }

    def process_batch(self, documents):
        id_key = self.keys[0]["value"]
        text_key = self.keys[1]["value"]

        key_to_text = defaultdict(str)
        for document in documents:
            id = document[id_key]
            key_to_text[id] += document[text_key] + "\n"

        output = []
        for k, v in key_to_text.items():
            output.append({self.annotations[0]["value"]: k, self.annotations[1]["value"]: v})
        return output
