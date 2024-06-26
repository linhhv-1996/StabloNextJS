import PostList from "@/components/postlist";
import Pagination from "@/components/blog/pagination";

import { getPaginatedPosts } from "@/lib/sanity/client";

export default async function Post({ searchParams }) {
  // Fetch the current page from the query parameters, defaulting to 1 if it doesn't exist
  const q = searchParams.q;
  const page = searchParams.page;
  const pageIndex = parseInt(page, 10) || 1;

  // Set the number of posts to be displayed per page
  const POSTS_PER_PAGE = 12;

  // Define the parameters for fetching posts based on the current page
  const params = {
    pageIndex: (pageIndex - 1) * POSTS_PER_PAGE,
    limit: pageIndex * POSTS_PER_PAGE
  };

  let posts = await getPaginatedPosts(params);
  posts = posts.filter((item) => item.title.includes(q) === true );

  // Check if the current page is the first or the last
  const isFirstPage = pageIndex < 2;
  const isLastPage = posts.length < POSTS_PER_PAGE;

  return (
    <>
      {posts && posts?.length === 0 && (
        <div className="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8">
        <div className="flex h-40 items-center justify-center">
            <span className="text-lg text-gray-500">¯\_(ツ)_/¯</span>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"></div>
    </div>
      )}
      <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {posts.map(post => (
          <PostList key={post._id} post={post} aspect="landscape" />
        ))}
      </div>

      <Pagination
        pageIndex={pageIndex}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </>
  );
}
