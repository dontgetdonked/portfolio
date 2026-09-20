let counter = 0

/** Short, sortable-enough id. Good enough for a local-only demo dataset. */
export function uid(prefix: string): string {
  counter += 1
  return `${prefix}_${Date.now().toString(36)}${counter.toString(36)}`
}
