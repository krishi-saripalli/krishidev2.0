import { getCollection, type CollectionEntry } from 'astro:content';
export type Post = CollectionEntry<'posts'>;
export async function getPosts(includeDrafts = false) {
  return (await getCollection('posts', ({ data }) => includeDrafts || !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
