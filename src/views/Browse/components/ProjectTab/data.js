import uuid from 'uuid/v1';

let datasets = [
  {
    id: uuid(),
    title: 'Movies and TV Shows',
    user: 'Netflix',
    description:
      'This dataset consists of tv shows and movies available on Netflix as of 2019. The dataset is collected from Flixable which is a third-party Netflix search engine. In 2018, they released an interesting report which shows that the number of TV shows on Netflix has nearly tripled since 2010. The streaming service’s number of movies has decreased by more than 2,000 titles since 2010, while its number of TV shows has nearly tripled. It will be interesting to explore what all other insights can be obtained from the same dataset. Integrating this dataset with other external datasets such as IMDB ratings, rotten tomatoes can also provide many interesting findings. ',
    imageUrl: 'https://cdn.vox-cdn.com/thumbor/AwKSiDyDnwy_qoVdLPyoRPUPo00=/39x0:3111x2048/1400x1400/filters:focal(39x0:3111x2048):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png',
    url: 'https://www.kaggle.com/shivamb/netflix-shows',
    totalDownloads: '594',
    updatedAt: '27/03/2019'
  },
  {
    id: uuid(),
    title: 'Coronavirus Articles',
    user: 'CBC News',
    description: 'Has the news media been overreacting or under-reacting during the development of COVID-19? What are the media\'s main focuses? How is the  news correlated to public reactions or policy changes? You might find many insights with more than 3,500 CBC news articles. The query was done via the search function on CBC news website: https://www.cbc.ca/search?q=COVID-19§ion=all&sortOrder=relevance.',
    imageUrl: 'https://yt3.ggpht.com/a/AATXAJw9-nrkipiE9UBOQbsVQkukKLZLCOUD2ooofg=s900-c-k-c0xffffffff-no-rj-mo',
    url: 'https://www.kaggle.com/ryanxjhan/cbc-news-coronavirus-articles-march-26',
    totalDownloads: '625',
    createdAt: '31/03/2019'
  },
  {
    id: uuid(),
    title: 'Sentiment Analysis Dataset',
    user: 'Kaggle - Twitter',
    description: 'This is the sentiment140 dataset. It contains 1,600,000 tweets extracted using the twitter api . The tweets have been annotated (0 = negative, 4 = positive) and they can be used to detect sentiment .',
    imageUrl: 'https://img.etimg.com/thumb/msid-73548819,width-643,imgsize-137241,resizemode-4/the-folks-at-twitter-teased-the-new-feature-with-a-tongue-in-cheek-tweet-.jpg',
    url: 'https://www.kaggle.com/kazanova/sentiment140',
    totalDownloads: '857',
    createdAt: '03/04/2019'
  }
];

let projects = [
  {
    id: uuid(),
    title: 'Tweet Sentiment Extraction',
    user: 'Tev\'n Powers',
    description:
      'With all of the tweets circulating every second it is hard to tell whether the sentiment behind a specific tweet will impact a company, or a person\'s, brand for being viral (positive), or devastate profit because it strikes a negative tone. Capturing sentiment in language is important in these times where decisions and reactions are created and updated in seconds. But, which words actually lead to the sentiment description? In this competition you will need to pick out the part of the tweet (word or phrase) that reflects the sentiment.',
    imageUrl: 'https://d1sjtleuqoc1be.cloudfront.net/wp-content/uploads/2019/04/25112909/shutterstock_1073953772.jpg',
    url: 'https://www.kaggle.com/c/tweet-sentiment-extraction',
    totalDownloads: '406',
    createdAt: '04/04/2019'
  },
  {
    id: uuid(),
    title: 'Gendered Pronoun Resolution',
    user: 'Kaggle',
    description:
      'Can you help end gender bias in pronoun resolution? Pronoun resolution is part of coreference resolution, the task of pairing an expression to its referring entity. This is an important task for natural language understanding, and the resolution of ambiguous pronouns is a longstanding challenge. ',
    imageUrl: 'https://cdn.worldvectorlogo.com/logos/google-ai-1.svg',
    totalDownloads: '835',
    createdAt: '04/04/2019'
  },
  {
    id: uuid(),
    title: 'NLP Getting Started Tutorial',
    user: 'Tev\'n Powers',
    description:
      'NLP - or Natural Language Processing - is shorthand for a wide array of techniques designed to help machines learn from text. Natural Language Processing powers everything from chatbots to search engines, and is used in diverse tasks like sentiment analysis and machine translation.',
    imageUrl: 'https://venturebeat.com/wp-content/uploads/2018/09/natural-language-processing-e1572968977211.jpg?fit=1200%2C600&strip=all',
    url: 'https://www.kaggle.com/philculliton/nlp-getting-started-tutorial',
    totalDownloads: '835',
    createdAt: '04/04/2019'
  }
];

let extensions = [
  {
    id: uuid(),
    title: 'Transformers',
    user: 'Hugging Face',
    description:
      'Transformers provides general-purpose architectures (BERT, GPT-2, RoBERTa, XLM, DistilBert, XLNet…) for Natural Language Understanding (NLU) and Natural Language Generation (NLG) with over 32+ pretrained models in 100+ languages and deep interoperability between TensorFlow 2.0 and PyTorch.',
    imageUrl: 'https://cdn-images-1.medium.com/max/1200/1*ABKawA7BD68tMpncHfAo_Q@2x.png',
    totalDownloads: '835',
    createdAt: '04/04/2019'
  },
  {
    id: uuid(),
    title: 'Tokenizers',
    user: 'Python NLTK',
    description:
      'NLTK Natural Language Processing with PythonNLTK is one of the leading platforms for working with human language data and Python, the module NLTK is used for natural language processing. NLTK is literally an acronym for Natural Language Toolkit.',
    imageUrl: 'https://i2.wp.com/clay-atlas.com/wp-content/uploads/2019/08/python_nltk.png?resize=592%2C644&ssl=1',
    totalDownloads: '835',
    createdAt: '04/04/2019'
  },
  {
    id: uuid(),
    title: 'Named Entity Recognition',
    user: 'spaCy',
    description:
      'NLTK Natural Language Processing with PythonNLTK is one of the leading platforms for working with human language data and Python, the module NLTK is used for natural language processing. NLTK is literally an acronym for Natural Language Toolkit.',
    imageUrl: 'https://spacy.io/static/social_default-1d3b50b1eba4c2b06244425ff0c49570.jpg',
    totalDownloads: '835',
    createdAt: '04/04/2019'
  }
];

export {
  datasets,
  extensions,
  projects
};