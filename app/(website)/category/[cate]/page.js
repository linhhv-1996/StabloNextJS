import { Suspense } from "react";
import Container from "@/components/container";
import Archive from "./category";
import Loading from "@/components/loading";


export const dynamic = "force-dynamic";
export const runtime = "edge";

const titleCase = (s) => s.replace(/^-*(.)|-+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase());


export default async function CategoryPage({ searchParams }) {
  return (
    <>
      <Container className="relative">
        <h1 className="text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
         { titleCase(searchParams.cate) }
        </h1>
        <div className="text-center">
          <p className="mt-2 text-lg">
            {/* { posts.length } Articles */}
          </p>
        </div>
        <Suspense
          key={searchParams.page || "1"}
          fallback={<Loading />}>
          <Archive searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}

// export const revalidate = 60;
