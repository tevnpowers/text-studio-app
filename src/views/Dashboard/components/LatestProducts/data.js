import uuid from 'uuid/v1';
import moment from 'moment';

export default [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: 'https://cdn2.iconfinder.com/data/icons/web-and-mobile-ui-volume-25/48/1237-512.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: 'https://cdn2.iconfinder.com/data/icons/web-and-mobile-ui-volume-25/48/1237-512.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: 'https://cdn2.iconfinder.com/data/icons/web-and-mobile-ui-volume-25/48/1237-512.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: 'https://cdn2.iconfinder.com/data/icons/web-and-mobile-ui-volume-25/48/1237-512.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: 'https://cdn2.iconfinder.com/data/icons/web-and-mobile-ui-volume-25/48/1237-512.png',
    updatedAt: moment().subtract(9, 'hours')
  }
];
