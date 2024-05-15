import HomePage from "./home";
import { getAllPosts } from "@/lib/sanity/client";

import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import CategoryLabel from "@/components/blog/category";
import { cx } from "@/utils/all";
import { parseISO, format } from "date-fns";
import Link from "next/link";


export const dynamic = "force-dynamic";

export default async function IndexPage() {
  const posts = await getAllPosts();

  return (

    <div>

      <div className="grid md:grid-cols-2 gap-5 md:gap-10 md:min-h-[calc(100vh-30vh)]" style={{ backgroundColor: "#ac906d" }}>
        <div className="relative aspect-video md:aspect-auto">
          <Link
            href={`/post/${posts[0].slug.current}`}>
            <Image src={urlForImage(posts[0].mainImage)} alt={posts[0].mainImage?.alt || "Thumbnail"} loading="lazy" fill
              sizes="100vw" className="object-cover transition-all" />
          </Link>
        </div>
        <div className="self-center px-5 pb-10">
          <Link
            href={`/post/${posts[0].slug.current}`}>
            <div className="max-w-2xl">
              <h1
                className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-white lg:leading-tight text-brand-primary lg:text-5xl">
                {posts[0].title}</h1>
              <div className="flex mt-4 space-x-3 text-gray-500 md:mt-8 ">
                <div className="flex flex-col gap-3 md:items-center md:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0 w-5 h-5">

                      <Image src={urlForImage(posts[0].author.image)} alt={posts[0].mainImage?.alt || "Thumbnail"}
                        loading="lazy" fill sizes="(max-width: 768px) 30vw, 33vw" className="object-cover rounded-full" />

                    </div>

                    <p className="text-gray-100 ">{posts[0].author.name} <span className="hidden pl-2 md:inline"> ·</span>

                    </p>
                  </div>
                  <div>
                    <div className="flex space-x-2 text-sm md:flex-row md:items-center">
                      <time
                        className="text-white"
                        dateTime={posts[0]?.publishedAt || posts[0]._createdAt}>
                        {format(
                          parseISO(posts[0]?.publishedAt || posts[0]._createdAt),
                          "MMMM dd, yyyy"
                        )}
                      </time>
                      <span className="text-white">{posts[0].estReadingTime || "5"} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center mt-10"><h2 className="text-2xl"><strong>Featured</strong> Posts</h2></div>

      {/* Featured */}
      <div className="container px-8 mx-auto xl:px-5  max-w-screen-xl py-5 lg:py-8">

        <div className="grid gap-10 mt-0 mb-0 lg:gap-10 md:grid-cols-3 lg:grid-cols-4 ">

          {posts.slice(1, 6).map((post, idx) => (
            <div className={cx(
              idx === 0
                ? "group cursor-pointer md:col-span-2 md:row-span-2"
                : "group cursor-pointer"
            )}>
              <div className=" overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">


                <Link
                  className={cx(idx === 0 ? "relative block aspect-[5/4]" : "relative block aspect-video")} href={`/post/${post.slug.current}`}>
                  <Image src={urlForImage(post.mainImage)} alt={post.mainImage?.alt || "Thumbnail"} loading="lazy" fill
                    sizes="(max-width: 768px) 30vw, 33vw" className="object-cover " />
                </Link>

              </div>
              <div className="">
                <div>
                  <div className="flex gap-3">
                    <CategoryLabel categories={post.categories} />
                  </div>

                  <h2 className="text-lg line-clamp-2 font-medium  tracking-normal text-black mt-2 dark:text-white">
                    <Link
                      href={`/post/${post.slug.current}`}>
                      <span
                        className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
                        {post.title}</span>
                    </Link>
                  </h2>
                  <div className="hidden">
                    <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                      <Link
                        href={`/post/${post.slug.current}`}>
                        <span
                          className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
                          {post.title}</span>
                      </Link>
                    </p>
                  </div>
                  <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                    <Link
                      href={`/author/${post?.author?.name}`}>
                      <div className="flex items-center gap-3">
                        <div className="relative h-5 w-5 flex-shrink-0">
                          <Image src={urlForImage(post.author.image)} alt={post.mainImage?.alt || "Thumbnail"}
                            loading="lazy" fill sizes="(max-width: 768px) 30vw, 33vw" className="object-cover rounded-full" />
                        </div>
                        <span className="truncate text-sm">
                          {post?.author?.name}
                        </span>
                      </div>
                    </Link>
                    <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
                    <time
                      className="truncate text-sm"
                      dateTime={post?.publishedAt || post._createdAt}>
                      {format(
                        parseISO(post?.publishedAt || post._createdAt),
                        "MMMM dd, yyyy"
                      )}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>


      <HomePage posts={posts} />


    </div>
  );
}

// export const revalidate = 1;
