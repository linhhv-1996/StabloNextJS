import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlug, getAllCategories } from "@/lib/sanity/client";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return { title: post.title };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  const categories = await getAllCategories();
  const relatedPosts = post.related.filter((item) => item.slug.current != params.slug).slice(0, 3);
  console.log(categories);
  return <PostPage post={post} related={relatedPosts} categories={categories}/>;
}

// export const revalidate = 60;
