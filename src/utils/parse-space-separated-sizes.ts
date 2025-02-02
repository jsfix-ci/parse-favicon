import { IterableOperator } from 'iterable-operator/lib/es2015/style/chaining/iterable-operator'
import matchAll from 'string.prototype.matchall'

export function parseSpaceSeparatedSizes(sizes: string): Array<{ width: number, height: number }> {
  if (/^\d+[x|X]\d+(?:\s+\d+[x|X]\d+)*$/.test(sizes)) {
    const re = /(?<width>\d+)[x|X](?<height>\d+)/g
    const matchResults = matchAll(sizes, re)
    return new IterableOperator(matchResults)
      .map(x => {
        const width = Number.parseInt(x.groups!.width, 10)
        const height = Number.parseInt(x.groups!.height, 10)
        return { width, height }
      })
      .toArray()
  }
  return []
}
