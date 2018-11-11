import * as React from 'react';
import { Delta } from 'jsondiffpatch';
import { JSONDiff } from './utils/JSONDiff';

export const DiffTab = ({
  delta,
  styling,
  base16Theme,
  labelRenderer
}: DiffTabProps) => (
  <JSONDiff {...{ delta, styling, base16Theme, labelRenderer }} />
);

interface DiffTabProps {
  delta: Delta;
  styling: any;
  base16Theme: any;
  labelRenderer: any;
}
