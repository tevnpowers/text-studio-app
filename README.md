[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tevnpowers/text-studio-app/blob/master/LICENSE) [![Issues](https://img.shields.io/github/issues-raw/tevnpowers/text-studio.svg?maxAge=25000)](https://github.com/tevnpowers/text-studio-app/issues)

> This application is currently under development by [Tev'n Powers](https://www.linkedin.com/in/tevnpowers) to satisfy the Master's Thesis component of the [University of Washington's Master's in Computational Linguistics](https://www.compling.uw.edu/). Special thanks to my thesis committee: [Cecilia Aragon](https://faculty.washington.edu/aragon/) (advisor) and [Emily Bender](https://faculty.washington.edu/ebender/) (reader). To share any questions, thoughts, or concerns please contact tevn@uw.edu or make a [GitHub issue](https://github.com/tevnpowers/text-studio-app/issues).


# Text Studio
*Text Studio* is a text processing architecture comprised of the `text-studio` [Python package](https://pypi.org/project/text-studio), software development kit (SDK), and desktop application. Each of these components contributes to creating the development environment where users can explore, process, model, and visualize textual data.

*Text Studio* is designed for the following audiences and purposes:
1. Experienced natural language processing practitioners (e.g. computational linguists, software engineers, data scientists, etc.) benefit from *Text Studio*'s improvement to the current developer experience by removing inefficiencies in the experimentation workflow. Built on the premise of collaboration, *Text Studio* simplifies discovery of NLP, statistical modeling, and machine learning modules for text data and enables seamless module integration into text processing pipelines via a plugin extensible architecture.
2. For users with minimal software engineering or computational linguistics backgrounds, *Text Studio* provides access to a rich set of text processing systems and techniques developed by the NLP community. Using the visual editor in the desktop application, every user has the power build sophisticated text processing pipelines to extract insights from any text data set without writing a single line of code.

## Architecture
### Desktop Application
The *Text Studio* application provides a visual interface for users to inspect and visualize text data, as well as facilitates the building of text processing systems based on NLP techniques and statistical or machine learning models.

The desktop application is implemented as an [Electron](https://www.electronjs.org/) app, with a Python backend.

### Software Development Kit (SDK) (coming soon)
The software development kit is built upon the `text-studio` [Python package](https://pypi.org/project/text-studio) and enables users to write and publish plugins that can be used by users of the desktop application. View the source of the `text-studio` package [here](https://github.com/tevnpowers/text-studio).

#### Application Installation
`git clone https://github.com/tevnpowers/text-studio-app`

(executable coming soon)

## Plugin Components
The major value of *Text Studio* is the hackable design that enables the developer community to extend its core functionality to support:
 - Loading data from arbitrary sources
 - Providing annotations on text data instances 
 - Generating artifacts (summary reports, statistics, visualizations, etc.) from text
 - Modeling text data

### Data Loader
In this system, a Data Loader is responsible for loading data that exists outside of the application into a canonical *Text Studio* data set. It must also provide the inverse functionality, to write a *Text Studio* data set to an external location.

### Pipeline
A text processing pipeline is any combination of Annotator, Action, or Model components that run in a sequence on an input data set.

#### Annotator
An Annotator runs a process which augments the input data it is given. That is, given a data instance, an annotator will attach new metadata onto the instance (e.g. tokenization output, part of speech tags, lemmatized version of the raw text, etc.).

#### Action
An Action consumes input data either individually or in bulk in order to produce an artifact about the input data, while not modifying or augmenting the original data instance(s). In this case, an artifact may be a visualization, a summary report, or any other insights that can be extracted from the provided data.

#### Model
(coming soon)