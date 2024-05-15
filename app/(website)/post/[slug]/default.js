import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";

import CategoryLabel from "@/components/blog/category";
import AuthorCard from "@/components/blog/authorCard";
import { titleCase } from "@/utils/all";


export default function Post(props) {
  const { loading, post, related, categories } = props;

  const slug = post?.slug;

  if (!loading && !slug) {
    notFound();
  }

  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  const cates = post?.categories;

  return (
    <>
      <div className="relative z-0 flex min-h-[calc(100vh-30vh)] items-center">
        <div className="absolute -z-10 h-full w-full before:absolute before:z-10 before:h-full before:w-full before:bg-black/30">
          <Image
            src={imageProps.src}
            alt={post.mainImage?.alt || "Thumbnail"}
            loading="eager"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="mx-auto max-w-screen-md px-5 py-20">
          <h1 className="text-brand-primary mb-3 mt-2 text-3xl font-semibold tracking-tight text-white lg:text-5xl lg:leading-tight">
            {post.title}
          </h1>
          <div className="mt-8 flex space-x-3 text-gray-500 ">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex gap-3">
                <div className="relative h-5 w-5 flex-shrink-0">
                  <a href="/author/mario-sanchez">
                    <Image
                      src={AuthorimageProps.src}
                      alt={post?.author?.name}
                      className="rounded-full object-cover"
                      fill
                      sizes="40px"
                    />
                  </a>
                </div>
                <p className="text-gray-100 ">
                  <Link href={`/author/${post.author.slug.current}`}>
                    {post.author.name}
                  </Link>
                  <span className="hidden pl-2 md:inline"> ·</span>
                </p>
              </div>
              <div>
                <div className="flex space-x-2 text-sm md:flex-row md:items-center">
                  <time
                    className="text-gray-100 dark:text-gray-100"
                    dateTime={post?.publishedAt || post._createdAt}>
                    {format(
                      parseISO(post?.publishedAt || post._createdAt),
                      "MMMM dd, yyyy"
                    )}
                  </time>
                  <span className="text-gray-100">
                    <span>· {post.estReadingTime || "5"} min read</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-screen-xl flex-col gap-5 px-5 md:flex-row">
        {/* <article className="mx-auto max-w-screen-md "> */}
        <article className="flex-1">
        
          <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
            {post.body && <PortableText value={post.body} />}
          </div>
          <div className="mb-7 mt-7 flex justify-center">
            <Link
              href="/"
              className="bg-brand-secondary/20 rounded-full px-5 py-2 text-sm text-blue-600 dark:text-blue-500 ">
              ← View all posts
            </Link>
          </div>
          {post.author && <AuthorCard author={post.author} />}
        </article>

        <aside className="sticky top-0 w-full self-start md:w-96">
  <div className="mt-5 font-sans">
    <div>
      <h3 className="text-2xl font-bold dark:text-white">Search Posts</h3>
      <form action="/search" method="GET" className="mt-4">
        <div className="relative">
          <input placeholder="Search" id="q" className="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-300 focus:shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:focus:border-white" type="text" name="q"></input>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="w-4 h-4 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
            </svg>
          </div>
        </div>
      </form>
    </div>
    <div className="mt-10">
      <h3 className="text-2xl font-bold dark:text-white">Related</h3>
      <div className="grid gap-6 mt-6">

      {related.map((post, idx) => (
        <Link href={`/post/${post.slug.current}`}>
                <div className="flex gap-5">
                <div className="relative w-24 h-20 overflow-hidden rounded-md shrink-0">
                <Image
                    src={urlForImage(post.image)}
                    alt={post.image?.alt || "Thumbnail"}
                    loading="eager"
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">{post.title}</h3>
                  <p className="mt-2 text-sm text-gray-100">
                  <time
                    className="text-gray-500 dark:text-gray-100"
                    dateTime={post?.date}>
                    {format(
                      parseISO(post?.date),
                      "MMMM dd, yyyy"
                    )}
                  </time>
                  </p>
                </div>
              </div>
        </Link>
        

     
      ))}
        


      </div>
    </div>
    <div className="mt-10">
      <h3 className="text-2xl font-bold dark:text-white">Categories</h3>
      <ul className="grid mt-4">

      {categories.map((cate, idx) => (
        <li>
          <Link className="flex items-center justify-between py-2" href={`/category/${cate.category}`}>
          <h4 className="text-gray-800 dark:text-gray-400">{titleCase(cate.category)}</h4>
          </Link>
      </li>
      ))}
  
      </ul>
    </div>
  </div>
</aside>
        
      </div>
    </>
  );
}

const MainImage = ({ image }) => {
  return (
    <div className="mb-12 mt-12 ">
      <Image {...urlForImage(image)} alt={image.alt || "Thumbnail"} />
      <figcaption className="text-center ">
        {image.caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {image.caption}
          </span>
        )}
      </figcaption>
    </div>
  );
};
