import { Suspense } from "react";
import Container from "@/components/container";
import Search from "./search";
import Loading from "@/components/loading";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function ArchivePage({ searchParams }) {
    return (
        <>
            <Container className="relative">
                <h1 className="text-center text-brand-primary text-xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">
                    {searchParams.q !== undefined && searchParams.q !== "" ? `Search results for "${searchParams.q}"` : "Search"}
                </h1>

                <form action="/search">
                    <div className="mx-auto mt-5 max-w-md">
                        <div className="relative">
                            <input defaultValue={searchParams.q} placeholder="Enter keywords and press enter" id="q" className="w-full px-3 py-2 border rounded-md outline-none focus:border-gray-300 focus:shadow-sm dark:bg-gray-900 dark:border-gray-600 dark:focus:border-white" type="text" name="q">
                            </input>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="w-4 h-4 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </form>

                <Suspense
                    key={searchParams.q || ""}
                    fallback={<Loading />}>
                    <Search searchParams={searchParams} />
                </Suspense>


            </Container>
        </>
    );
}

export const revalidate = 1;
