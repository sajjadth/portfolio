import { posts } from '@/lib/posts';
import { BlogListPageClient } from './blog-list-client';

export const metadata = {
  title: 'Blog — Sajjad Tahmouresi',
  description: 'Thoughts on Go, Linux, DevOps, and software engineering.',
};

export default function BlogListPage() {
  return <BlogListPageClient posts={posts} />;
}
