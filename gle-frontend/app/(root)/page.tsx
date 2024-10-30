import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">A Gamified Learning Environment just for you!</h1>
            <p className="p-regular-20 md:p-regular-24">Upload your study notes for any subject or course and generate a quiz fit to your needs. Level up your profile while improving your study</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#notes">
                Check it out
              </Link>
            </Button>
          </div>

          <Image 
            src="/assets/images/hero.jpg"
            alt="hero"
            width={1000}
            height={1500}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] border-4 border-gray-300 rounded-lg"
          />
        </div>
      </section>

      <section id="notes" className="wrapper my-8 flex flex-col gap-8 md:gap-12">

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search/>
          <CategoryFilter />
        </div>

        <Collection 
          data={notes?.data}
          emptyTitle="No Notes Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Notes"
          limit={6}
          page={page}
          totalPages={notes?.totalPages}
        />
      </section>
    </>
  );
}
