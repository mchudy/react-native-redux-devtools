import * as React from 'react';
import { Delta } from 'jsondiffpatch';
import JSONTree from 'react-native-json-tree';
import themes from '../../themes';
import getItemString from './getItemString';
const stringify = require('javascript-stringify');

function stringifyAndShrink(val: any): string {
  if (val === null) {
    return 'null';
  }

  const str = stringify(val);
  if (typeof str === 'undefined') {
    return 'undefined';
  }

  return str.length > 22 ? `${str.substr(0, 15)}…${str.substr(-5)}` : str;
}

const expandFirstLevel = (
  _keyName: string,
  _data: Object,
  level: number
): boolean => level <= 1;

function prepareDelta(value: Delta): Delta {
  if (value && value._t === 'a') {
    const arrayDelta: any = value;
    const res: any = {};
    for (let key in arrayDelta) {
      if (key !== '_t') {
        if (key[0] === '_' && !arrayDelta[key.substr(1)]) {
          res[key.substr(1)] = arrayDelta[key];
        } else if (arrayDelta['_' + key]) {
          res[key] = [arrayDelta['_' + key][0], arrayDelta[key][0]];
        } else if (!arrayDelta['_' + key] && key[0] !== '_') {
          res[key] = arrayDelta[key];
        }
      }
    }
    return res;
  }

  return value;
}

export class JSONDiff extends React.PureComponent<JSONDiffProps> {
  render() {
    const { delta } = this.props;
    return (
        <JSONTree
        //   labelRenderer={labelRenderer}
          invertTheme={false}
          theme={themes}
          data={delta}
          getItemString={getItemString}
          // valueRenderer={this.valueRenderer}
          postprocessValue={prepareDelta}
          isCustomNode={Array.isArray}
          shouldExpandNode={expandFirstLevel}
          hideRoot
        />
    );
  }

  // valueRenderer = (raw: React.ReactElement<any>, value: any): React.ReactElement<any> => {
  //   function renderSpan(name: string, body) {
  //     return (
  //       <span key={name} {...styling(['diff', name])}>{body}</span>
  //     );
  //   }

  //   if (Array.isArray(value)) {
  //     switch(value.length) {
  //     case 1:
  //       return (
  //         <span {...styling('diffWrap')}>
  //           {renderSpan('diffAdd', stringifyAndShrink(value[0], isWideLayout))}
  //         </span>
  //       );
  //     case 2:
  //       return (
  //         <span {...styling('diffWrap')}>
  //           {renderSpan('diffUpdateFrom', stringifyAndShrink(value[0], isWideLayout))}
  //           {renderSpan('diffUpdateArrow', ' => ')}
  //           {renderSpan('diffUpdateTo', stringifyAndShrink(value[1], isWideLayout))}
  //         </span>
  //       );
  //     case 3:
  //       return (
  //         <span {...styling('diffWrap')}>
  //           {renderSpan('diffRemove', stringifyAndShrink(value[0], isWideLayout))}
  //         </span>
  //       );
  //     }
  //   }

  //   return raw;
  // }
}

interface JSONDiffProps {
  delta: Delta;
}
