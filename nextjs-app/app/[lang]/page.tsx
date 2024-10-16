"use client";

import Link from "next/link";
import { FormattedMessage } from "react-intl";

export default function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="text-center py-32 sm:py-48 lg:py-56">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          <FormattedMessage id="home.title" />
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          <FormattedMessage id="home.description" />
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <div>
            <div className="flex">
              <Link href={`/${lang}/play`} passHref>
                <button className="btn btn-primary m-4 btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                  <FormattedMessage id="home.play" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
