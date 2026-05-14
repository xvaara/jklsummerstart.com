const raw = import.meta.glob('/content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const byPath: Record<string, { path: string, title: string, markdown: string }> = {}
for (const [key, markdown] of Object.entries(raw)) {
  const m = key.match(/\/content\/(.+)\.md$/)
  if (!m)
    continue
  const slug = m[1]
  const path = `/${slug}`
  const title = slug.split('/').pop()!
  byPath[path] = { path, title, markdown }
}

function normalize(path: string) {
  if (path.length > 1 && path.endsWith('/'))
    return path.slice(0, -1)
  return path
}

export function useContent() {
  return {
    get(path: string) {
      return byPath[normalize(path)]
    },
    list(prefix: string) {
      return Object.values(byPath).filter(e => e.path.startsWith(prefix))
    },
  }
}
