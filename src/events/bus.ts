import mitt from 'mitt';

type Events = {
  'noun-active-labels-updated': string[];
  'noun-all-labels-updated': string[];
};

export const bus = mitt<Events>();
