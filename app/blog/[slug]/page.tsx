import { posts } from "@/lib/blog-posts";
import BlogPostView from "./BlogPostView";

// Static export: every blog post page is generated at build time.
export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

// Unknown slugs get the 404 page instead of being rendered on demand.
export const dynamicParams = false;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostView slug={slug} />;
}
