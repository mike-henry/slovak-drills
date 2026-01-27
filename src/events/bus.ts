import mitt from 'mitt';

type Events = {
  'noun-active-labels-updated': string[];
  'noun-all-labels-updated': string[];
  'adjective-all-labels-updated': string[];
  'adjective-active-labels-updated': string[];
  'proposition-all-labels-updated': string[];
  'proposition-active-labels-updated': string[];
  'verb-all-labels-updated': string[];
  'verb-active-labels-updated': string[];
};

export const bus = mitt<Events>();
