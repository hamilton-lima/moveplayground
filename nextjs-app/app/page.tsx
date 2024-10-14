import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="text-center py-32 sm:py-48 lg:py-56">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Move, Play, Control
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          In Move Playground, your body is the controller. Your movements shape
          the game in real-time. Ready to jump in?
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <div>
            <div className="flex">
              <Link href="/play" passHref>
                <button className="btn btn-primary m-4 btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                  PLAY
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
