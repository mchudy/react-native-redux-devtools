import * as React from 'react';
import { Text } from 'react-native';
import getType from '../../utils/getType';

function getShortTypeString(val: any, diff?: boolean): string {
  const type = getType(val);

  if (diff && Array.isArray(val)) {
    val = val[val.length === 2 ? 1 : 0];
  }

  switch (type) {
  case 'Immutable List':
  case 'Immutable Stack':
  case 'Immutable Seq':
    return '<I>' + val.size ? '[…]' : '[]';
  case 'Map':
    return val.size ? '{…}' : '{}';
  case 'WeakMap':
    return '{…}';
  case 'Set':
    return val.size ? '(…)' : '()';
  case 'WeakSet':
    return '(…)';
  case 'Immutable Map':
  case 'Immutable OrderedMap':
    return '<I>' + val.size ? '{…}' : '{}';
  case 'Immutable Set':
  case 'Immutable OrderedSet':
    return '<I>' + val.size ? '(…)' : '()';
  case 'Iterable':
    return '(…)';
  case 'Array':
    return val.length > 0 ? '[…]' : '[]';
  case 'Null':
    return 'null';
  case 'Undefined':
    return 'undef';
  case 'Error':
    return `Error(${getShortTypeString(val.message)}`;
  case 'Object':
    return Object.keys(val).length > 0 ? '{…}' : '{}';
  case 'Function':
    return 'fn';
  case 'String':
    return `"${val.substr(0, 10) + (val.length > 10 ? '…' : '')}"`
  case 'Symbol':
    return 'symbol';
  default:
    return val.toString();
  }
}

function getFirstEntries(data: any, limit: number, getEntryString: (entry: any) => string): string {
  let idx = 0, arr = [];

  for (let entry of data) {
    if (idx === 3) {
      arr.push('…');
      break;
    };
    arr.push(getEntryString(entry));
    idx++;
  }

  return arr.join(', ');
}

  function getText(type: string, data: any, isDiff: boolean): string {
let str;
  type = getType(data);

  switch(type) {
  case 'Immutable List':
  case 'Immutable Stack':
  case 'Immutable Seq':
    str = getFirstEntries(data, 3, entry => getShortTypeString(entry));
    return `<I>[ ${str} ]`;
  case 'Map':
    str = getFirstEntries(data, 3, entry =>
      `${getShortTypeString(entry[0])} => ${getShortTypeString(entry[1])}`
    );
    return `{ ${str} }`;
  case 'WeakMap':
    return '{…}';
  case 'Set':
    str = getFirstEntries(data, 3, entry => getShortTypeString(entry));
    return `( ${str} )`;
  case 'WeakSet':
    return '(…)';
  case 'Immutable Map':
  case 'Immutable OrderedMap':
    str = getFirstEntries(data, 3, entry =>
      `${getShortTypeString(entry[0])} => ${getShortTypeString(entry[1])}`
    );
    return `<I>{ ${str} }`;
  case 'Immutable Set':
  case 'Immutable OrderedSet':
    str = getFirstEntries(data, 3, entry => getShortTypeString(entry));
    return `<I>( ${str} )`;
  case 'Object':
    const keys = Object.keys(data);
    return keys.length ? '{…}' : '{}';
  case 'Array':
    return data.length ? '[…]' : '[]';
  default:
    return type;
  }
}

const getItemString = (
  type: string,
  data: Object,
  isDiff: boolean = false
) =>
  <Text>
    {getText(type, data, isDiff)}
  </Text>

export default getItemString;
