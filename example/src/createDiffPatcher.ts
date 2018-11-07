const diffPatcher = require('jsondiffpatch');
import { DiffPatcher, DiffContext } from 'jsondiffpatch';

export type ObjectHash = (item: any) => string;
export type PropertyFilter = (name: string, context: DiffContext) => boolean;

const defaultObjectHash = (o: any, idx: any) =>
  (o === null && '$$null') ||
  (o && (o.id || o.id === 0) && `$$id:${JSON.stringify(o.id)}`) ||
  (o && (o._id || o._id === 0) && `$$_id:${JSON.stringify(o._id)}`) ||
  '$$index:' + idx.toString();

const defaultPropertyFilter = (name: string, context: DiffContext) =>
  typeof context.left[name] !== 'function' &&
  typeof context.right[name] !== 'function';

const defaultDiffPatcher = diffPatcher.create({
  arrays: { detectMove: false },
  objectHash: defaultObjectHash,
  propertyFilter: defaultPropertyFilter
});

export default function createDiffPatcher(
  objectHash: ObjectHash,
  propertyFilter: PropertyFilter
): DiffPatcher {
  if (!objectHash && !propertyFilter) {
    return defaultDiffPatcher;
  }

  return diffPatcher.create({
    arrays: { detectMove: false },
    objectHash: objectHash || defaultObjectHash,
    propertyFilter: propertyFilter || defaultPropertyFilter
  });
}
