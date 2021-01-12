import { v4 } from 'uuid';

export function uuid(namespace?: string) {
  const id = v4();

  return namespace ? `${namespace}:${id}` : id;
}
