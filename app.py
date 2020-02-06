import argparse
import json
import os
import sys
from datetime import datetime

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import text_studio  # noqa
from text_studio.dataset import Dataset
from extensions.html_parser import HtmlParser

METADATA_KEYS = ["author", "created", "saved"]


class Project(object):
    def __init__(self, filepath=""):
        self.filepath = filepath
        self.metadata = {
            "author": "",
            "created": get_current_time(),
            "saved": "",
            "data": [],
            "modules": [],
            "pipelines": [],
        }

        self.datasets = {}
        self.modules = {}
        self.pipelines = {}

        if filepath:
            with open(filepath, "r") as f:
                content = json.loads(f.read())
                self.parse_config(content)

        self.load_datasets()

    @property
    def directory(self):
        if self.filepath:
            return os.path.dirname(self.filepath)
        return ""

    def save(self, filepath):
        self.metadata["saved"] = get_current_time()

    def parse_config(self, config):
        if "metadata" in config:
            for key in METADATA_KEYS:
                if key in config["metadata"]:
                    self.metadata[key] = config["metadata"][key]

        if "data" in config:
            for path in config["data"]:
                self.add_dataset(path)

        if "modules" in config:
            for module in config["modules"]:
                self.add_module(module)

        if "pipelines" in config:
            for name in config["pipelines"]:
                self.add_pipeline(name, config["pipelines"][name])

    def add_dataset(self, filepath):
        self.datasets[filepath] = Dataset(os.path.join(self.directory, filepath))

    def add_module(self, module_info):
        if module_info["name"] == "HtmlParser":
            kwargs = module_info["config"]
            module = HtmlParser()
            module.setup(**kwargs)
            self.modules[module_info["id"]] = module

    def add_pipeline(self, name, info):
        pipeline = []
        for module_dict in info:
            module = self.modules[module_dict["id"]]
            output = module_dict["output"]
            pipeline.append((module, output))
        self.pipelines[name] = pipeline

    def load_datasets(self):
        for fielname, dataset in self.datasets.items():
            dataset.load_data("csv")

    def run_pipeline(self, pipe_name, dataset_path):
        data = self.datasets[dataset_path].instances[:]
        pipeline = self.pipelines[pipe_name]
        for module, annotation in pipeline:
            i = 0
            for result in module.process_batch(data):
                data[i][annotation] = result
                i += 1
            self.datasets[dataset_path].instances = data

def get_current_time():
    return datetime.now().isoformat(timespec="minutes")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process some text.")
    parser.add_argument(
        "--project",
        metavar="p",
        type=str,
        nargs=1,
        help="a text studio project file (json)",
    )

    args = parser.parse_args()
    if args.project:
        print("Loading project...")
        project = Project(args.project[0])

        print("Running FanFict pipeline...")
        project.run_pipeline("FanFict", "../data/story_content.csv")
    else:
        print("*" * 21)
        print("*CLI for Text Studio*")
        print("*" * 21)
        print("\n")
        print(parser.description)
        parser.print_usage()
        print("\n")
