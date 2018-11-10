import * as React from 'react';
import { Text } from 'react-native';
import { Delta } from 'jsondiffpatch';

export const DiffTab = (
    { delta }: DiffTabProps
  ) =>
    <Text>{delta}</Text>;
  

interface DiffTabProps {
  delta: Delta;
}
