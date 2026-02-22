import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";

export function Hero() {
  return (
    <section className="w-full py-24 md:py-32 lg:py-40 bg-size-[32px_32px] bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-3xl flex flex-col items-center">
            <div className="inline-block rounded-full border-2 border-black bg-white px-4 py-1.5 mb-4 shadow-md dark:bg-black dark:border-white">
              <Text as="p" className="text-sm font-bold uppercase tracking-wider text-black dark:text-white">
                ✨ Next.js 15 & Retro UI Ready
              </Text>
            </div>
            <Text as="h1" className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter drop-shadow-md text-black dark:text-white">
              Build with Style and Nostalgia
            </Text>
            <Text as="p" className="mx-auto max-w-[600px] text-zinc-900 font-medium dark:text-zinc-200 md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed">
              Kickstart your next project using standard Next.js best practices and
              the beautiful, neo-brutalist components of Retro UI.
            </Text>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto justify-center text-lg">
              Get Started
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto justify-center text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
