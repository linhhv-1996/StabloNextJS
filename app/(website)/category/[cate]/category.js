import PostList from "@/components/postlist";
import { getPostsByCategory } from "@/lib/sanity/client";

export default async function Post({ searchParams }) {
  const posts = await getPostsByCategory(searchParams.cate);
  return (
    <>
      {posts && posts?.length === 0 && (
        <div className="flex h-40 items-center justify-center">
          <span className="text-lg text-gray-500">
            End of the result!
          </span>
        </div>
      )}
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {posts.map(post => (
          <PostList key={post._id} post={post} aspect="landscape" />
        ))}
      </div>
    </>
  );
}
