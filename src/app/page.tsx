import Image from "next/image";
import Quote from "@/components/Quote";
import Title from "@/components/Title";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8 font-mono border-b pb-2 border-slate-200">Vincent Ramdhanie</h1>
      <div className="py-2 text-foreground not-prose">
        I am a <a
          href="https://bahai.org"
          className="text-primary underline hover:text-primary/80 hover:no-underline">Baha&apos;i</a
        >. Baha&apos;is are working in your neighbourhood to build better communities and develop an ever
        advancing society. You can read more about the work of the Baha&apos;is <a
          href="https://www.bahai.org/action"
          className="text-primary underline hover:text-primary/80 hover:no-underline">here</a
        >.
      </div>
      <div className="w-full text-center text-muted-foreground font-sm my-4">- &#9702; -</div>
      <div className="py-2 text-foreground not-prose">
        I am a senior software engineer. I work at <a
          href="https://sybill.ai"
          className="text-primary underline hover:text-primary/80 hover:no-underline">Sybill</a
        >. Sybill is an AI-powered sales assistant that automates CRM updates, crafts personalized follow-up emails, and provides accurate call summaries by analyzing verbal and non-verbal cues, enhancing sales team productivity and efficiency.
      </div>
      <div className="w-full text-center text-muted-foreground font-sm my-4">- &#9702; -</div>
      <div className="py-2 not-prose">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-1/3 shrink-0 order-1">
            <Image 
              src="/images/work.webp" 
              alt="Remote Work Environment" 
              width={400}
              height={300}
              className="rounded-md shadow-sm w-full" 
            />
          </div>
          <div className="md:w-2/3 order-2 text-foreground">
            <p>
              Previously, I was a senior software engineer at <a
                href="https://lindy.ai"
                className="text-primary underline hover:text-primary/80 hover:no-underline">Lindy</a
              >. Lindy.ai is building advanced autonomous agents that can independently handle complex tasks across multiple domains, with sales and customer support being just two examples of the capabilities these AI agents can perform. These autonomous agents are designed to understand context, make decisions, and execute complete workflows without human intervention.
            </p>
            <p className="mt-2">
              Lindy pivoted from <a href="https://teamflowhq.com" className="text-primary underline hover:text-primary/80 hover:no-underline">Teamflow</a>. Teamflow is an all-in-one virtual office platform that enables remote teams to collaborate seamlessly through features like spatial audio, customizable workspaces, and integrated tools, fostering spontaneous interactions and efficient meetings.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full text-center text-muted-foreground font-sm my-4">- &#9702; -</div>
      <div className="py-2 not-prose">
        <div className="font-bold mb-4 text-foreground">Artificial Intelligence</div>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-2/3 order-2 md:order-1 text-foreground">
            <p className="py-2">
              Artificial intelligence is at the forefront of technological progress, with the potential to reshape society and drive scientific advancements that improve global quality of life.
            </p>
            <p className="py-2">
              I have studied AI since my undergraduate years, focusing on neural networks, decision support systems, and compilers. In graduate school, I explored AI applications, Prolog, and SML, with my Master&apos;s thesis on implementing a parallel version of the simulated annealing algorithm on GPU architecture.
            </p>
            <p className="py-2">
              As machine learning gained prominence, I dedicated time to teaching and mentoring in the field.
            </p>
            <p className="py-2">
              Today, I work with a team of engineers to harness AI for meaningful impact. The challenges are significant, but the opportunities for learning and innovation are vast.
            </p>
          </div>
          <div className="md:w-1/3 shrink-0 order-1 md:order-2">
            <Image 
              src="/images/gpu.webp" 
              alt="GPU Architecture" 
              width={400}
              height={300}
              className="rounded-md shadow-sm w-full" 
            />
          </div>
        </div>
      </div>
      <div className="w-full text-center text-muted-foreground font-sm my-4">- &#9702; -</div>
      <div className="py-2 w-full max-w-3xl not-prose">
        <Title title="Writing & Learning" subtitle="Articles and Reading Lists" />
        <div className="flex flex-wrap gap-4 mb-6">
          <Link href="/articles" className="text-primary hover:text-primary/80 underline">
            Technical Articles
          </Link>
          <Link href="/books/2025" className="text-primary hover:text-primary/80 underline">
            2025 Reading List
          </Link>
          <Link href="/books/2024" className="text-primary hover:text-primary/80 underline">
            2024 Reading List
          </Link>
          <Link href="/books/2023" className="text-primary hover:text-primary/80 underline">
            2023 Reading List
          </Link>
        </div>
      </div>
      <div className="w-full text-center text-muted-foreground font-sm my-4">- &#9702; -</div>
      <div className="py-2 prose prose-slate max-w-none prose-p:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        Any hope of contributing to a brighter future for mankind, rest on the fundamental
        acceptance of the nobility of man.

        <Quote author="Baha'u'llah">
          <span className="font-semibold">O SON OF SPIRIT!</span>
          <span className="block"
            >Noble have I created thee, yet thou hast abased thyself. Rise then unto that for
            which thou wast created.</span
          >
        </Quote>
      </div>
    </>
  );
}
