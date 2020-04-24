export default  {
  'metadata': {
    'author':'Tev\'n Powers',
    'created':'\'2020-02-05T70:00\'',
    'saved':'\'2020-02-06T00:50\''
  },
  'loaders': [
    {
      'id': '05eea941-5ae7-4acf-884a-dfb863755b79',
      'name': 'CsvLoader',
      'config': {
        'delimiter': ','
      }
    }
  ],
  'data': [
    {
      'id': '5eacbf07-d9b8-4d02-b674-8badb7703e2a',
      'name': 'Student Dataset',
      'description': 'This is a roster of students...',
      'languages': ['English'],
      'path': '../data/story_content.csv',
      'config': {
        'loader_id': '05eea941-5ae7-4acf-884a-dfb863755b79'
      }
    },
    {
      'id': 'cf9c5dac-0f8d-4a57-a176-9130068f48f1',
      'name': 'Fanfiction Stories (Clean)',
      'description': 'This is a set of 1M fanfiction stories written from 2012-2015.',
      'languages': ['English'],
      'path': '../data/story_content_cleaned.csv',
      'config': {
        'loader_id': '05eea941-5ae7-4acf-884a-dfb863755b79'
      }
    },
    {
      'id': '857292df-7cb7-4d17-a95a-bd570be378be',
      'name': 'Fanfiction Fandoms',
      'description': 'This is a set of 1M fanfiction stories written from 2012-2015 grouped by fandom.',
      'languages': ['English'],
      'path': '../data/fandoms.csv',
      'config': {
        'loader_id': '05eea941-5ae7-4acf-884a-dfb863755b79'
      }
    }
  ],
  'annotators': [
    {
      'id': '4991a5d6-b64c-4dd6-bedc-87b354b575bf',
      'name': 'HtmlParser',
      'path': 'html_parser.py',
      'description': 'Beautiful Soup is a Python package for parsing HTML and XML documents. It creates a parse tree for parsed pages that can be used to extract data from HTML, which is useful for web scraping. It is available for Python 2.7 and Python 3. ',
      'config': {
        'name': 'Html Parser',
        'keys': [
          {
            'name' : 'Input',
            'value': 'story_content_content',
            'description': 'This is the key for your HTML text that should be processed by the annotator.'
          },
        ],
        'annotations': [
          {
            'name' : 'Output',
            'value': 'text',
            'description': 'After processing, this with be the key to access the cleaned text.'
          },
        ]
      }
    },
    {
      'id': '630a1ed2-fa02-441a-bf89-ee708c7529a0',
      'name': 'Accumulator',
      'path': 'accumulator.py',
      'config': {
        'name': 'Accumulator',
        'keys': ['story_fandom_id', 'filtered_text'],
        'annotations': ['id', 'text']
      }
    },
    {
      'id': 'e897400d-36e6-454c-9bd4-8bf5b9195a0b',
      'name': 'PosTagger',
      'path': 'pos_tagger.py',
      'config': {
        'name': 'Tagger',
        'keys': ['text'],
        'annotations': ['tagged_tokens', 'filtered_text'],
        'filters': ['NNP', 'NNPS']
      }
    }
  ],
  'actions': [
    {
      'id': 'caeadf1d-40b5-4ba1-8817-5d890ad5c3bc',
      'name': 'WordCloud',
      'path': 'word_cloud.py',
      'config': {
        'name': 'Word Cloud',
        'keys': ['id', 'text']
      }
    }
  ],
  'pipelines': [
    {
      'id': 'b2e347ed-7a77-46e1-a024-0f8e43ec3a6c',
      'name': 'FanFict',
      'components': [
        '4991a5d6-b64c-4dd6-bedc-87b354b575bf',
        'e897400d-36e6-454c-9bd4-8bf5b9195a0b',
        '630a1ed2-fa02-441a-bf89-ee708c7529a0',
        'caeadf1d-40b5-4ba1-8817-5d890ad5c3bc'
      ]
    }
  ]
}