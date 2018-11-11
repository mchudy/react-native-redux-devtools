import * as React from 'react';
import { Delta } from 'jsondiffpatch';
import JSONTree from 'react-native-json-tree';
import getItemString from './getItemString';
import { Text } from 'react-native';
import bind from 'bind-decorator';
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
    const { styling, delta, labelRenderer, base16Theme } = this.props;

    if (!delta) {
      return (
        <Text {...styling('stateDiffEmpty')}>
          (states are equal)
        </Text>
      );
    }

    return (
        <JSONTree
          labelRenderer={labelRenderer}
          invertTheme={false}
          theme={base16Theme}
          data={delta}
          getItemString={getItemString}
          valueRenderer={this.valueRenderer}
          postprocessValue={prepareDelta}
          isCustomNode={Array.isArray}
          shouldExpandNode={expandFirstLevel}
          hideRoot
        />
    );
  }

  @bind
  private valueRenderer(raw: React.ReactElement<any>, value: any): React.ReactElement<any> {
    const { styling } = this.props;

    function renderSpan(name: string, body: any) {
      return (
        <Text key={name} {...styling(['diff', name])}>{body}</Text>
      );
    }

    if (Array.isArray(value)) {
      switch(value.length) {
      case 1:
        return (
          <Text {...styling('diffWrap')}>
            {renderSpan('diffAdd', stringifyAndShrink(value[0]))}
          </Text>
        );
      case 2:
        return (
          <Text {...styling('diffWrap')}>
            {renderSpan('diffUpdateFrom', stringifyAndShrink(value[0]))}
            {renderSpan('diffUpdateArrow', ' => ')}
            {renderSpan('diffUpdateTo', stringifyAndShrink(value[1]))}
          </Text>
        );
      case 3:
        return (
          <Text {...styling('diffWrap')}>
            {renderSpan('diffRemove', stringifyAndShrink(value[0]))}
          </Text>
        );
      }
    }

    return raw;
  }
}

interface JSONDiffProps {
  delta: Delta;
  labelRenderer: any;
  styling: any;
  base16Theme: any;
}
