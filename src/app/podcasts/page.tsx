import Title from '@/components/Title';
import Podcast from '@/components/Podcast';

export default function PodcastsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8 font-mono border-b pb-2 border-slate-200">Podcasts</h1>
      
      <div className="mb-6">
        <p className="text-foreground">
          Some podcasts that I frequently listen to. I&apos;ve included a short description of each
          podcast, as well as my personal rating out of 10. This list represents over 6 hours of new
          content per week. I generally listen at 1.8 speed so it just barely fits in my weekly
          commute. I am at max podcast capacity.
        </p>
        <div className="text-sm text-muted-foreground mt-2">This list was updated in December 2023.</div>
      </div>

      <div className="space-y-8">
        <section>
          <Title title="Science" subtitle="Podcasts" />
          <ul className="space-y-4">
            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="Why This Universe?"
                presenters={['Dan Hooper', 'Shalma Wegsman']}
                yearStarted="2020"
                cover="why_this_universe.png"
                cadence="weekly"
                numberOfEpisodes={85}
                isActive={true}
              >
                Dan and Shalma break down some of the biggest ideas in physics. They talk about
                the universe, black holes, quantum mechanics, and more. Always informative,
                always entertaining.
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="The State of The Universe"
                presenters={['Brendan Drachler']}
                yearStarted="2018"
                cover="state_of_the_universe.webp"
                cadence="every two weeks"
                numberOfEpisodes={81}
                isActive={true}
              >
                Brandon talks to scientists about their research. He covers a wide range of
                topics, from the origin of life to the nature of dark matter. He also talks
                about the process of science, and how scientists think about the world.
                <p className="text-xs text-muted-foreground mt-2 line-through">
                  I am listening to a few episodes of this during December 2023 to determine
                  if it is worth the time.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                    Great podcast. I&apos;ve Listened to all available episodes.
                </p>
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="Daniel and Jorge Explain the Universe"
                presenters={['Daniel Whiteson', 'Jorge Cham']}
                yearStarted="2018"
                cover="explain_the_universe.webp"
                cadence="every few days"
                numberOfEpisodes={552}
                isActive={true}
              >
                Daniel and Jorge talk about the biggest ideas in physics. They cover topics like
                the nature of time, the origin of the universe, and the search for dark matter.
                They also talk about the process of science, and how scientists think about the
                world.
                <p className="text-xs text-muted-foreground mt-2 line-through">
                  I am listening to a few episodes of this during December 2023 to determine
                  if it is worth the time.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                    Excellent podcast. I&apos;ve been listening consistently for the last year and the humour and explanations are great.
                </p>
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">8/10</span>
              </div>
              <Podcast
                title="Star Talk radio"
                presenters={['Neil deGrasse Tyson']}
                yearStarted="2009"
                cover="star_talk_radio.webp"
                cadence="every few days"
                numberOfEpisodes={880}
                isActive={true}
              >
                This is an excellent podcast from Neil deGrasse Tyson. He talks about a wide
                range of topics, from the origin of life to the nature of dark matter. He also
                talks about pop culture and the impact of science on society. The show is a bit
                commercial radio in that it never gets a chance to investigate topics as deeply
                as I would like but it is funny and does introduce many luminaries in the field.
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="The Infinite Monkey Cage"
                presenters={['Brian Cox', 'Robin Ince']}
                yearStarted="2009"
                cover="infinite_monkey_cage.webp"
                cadence="weekly"
                numberOfEpisodes={193}
                isActive={true}
              >
                Very funny and insightful show about science. Brian Cox and Robin Ince are
                joined by a panel of experts to discuss a wide range of topics. The show is
                always entertaining and informative.
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">9/10</span>
              </div>
              <Podcast
                title="Science Quickly"
                presenters={['Various']}
                yearStarted="2009"
                cover="science_quickly.webp"
                cadence="every few days"
                numberOfEpisodes={500}
                isActive={true}
              >
                Short snippets about the latest news and happenings in science from Scientific
                American.
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="Science In Action"
                presenters={['Roland Pease']}
                yearStarted="1990"
                cover="science_in_action.webp"
                cadence="every few days"
                numberOfEpisodes={1373}
                isActive={true}
              >
                BBC&apos;s science podcast. Covers all the science news each week with interviews
                from the scientists involved in the research.
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="Physics World Weekly"
                presenters={[
                  'Hamish Johnston',
                  'Margaret Harris',
                  'Tami Freeman',
                  'James Dacey',
                ]}
                yearStarted="2021"
                cover="physics_world.jpeg"
                cadence="weekly"
                numberOfEpisodes={281}
                isActive={true}
              >
                Provides insight into the latest physics news. Interviews from scientist and
                business of physics. A good way to keep abreast of the latest developments in
                the world of Physics.
              </Podcast>
            </li>
          </ul>
        </section>

        <section>
          <Title title="Comedy" subtitle="Podcasts" />
          <ul className="space-y-4">
            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="Friday Night Comedy"
                presenters={['Various']}
                yearStarted="2020"
                cover="friday_night_comedy.webp"
                cadence="weekly"
                numberOfEpisodes={197}
                isActive={true}
              >
                Alternates between The Now show with Hugh Dennis and Steve Punt, The News Quiz
                and Dead Ringers. Absolute top notch comedy from a wide variety of British
                comedians.
                <p className="text-xs text-muted-foreground mt-2">
                  The BBC does not keep all episodes available. Episodes are only available
                  for a few weeks so I have no idea how many episodes were made in total.
                </p>
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="Comedy of The Week"
                presenters={['Various']}
                yearStarted="2020"
                cover="comedy_of_the_week.webp"
                cadence="weekly"
                numberOfEpisodes={5}
                isActive={true}
              >
                Brilliant comedy from the UK. This is a variety show where every week they bring
                a comedy show featuring stand up comedians and others.
                <p className="text-xs text-muted-foreground mt-2">
                  The BBC does not keep all episodes available. Episodes are only available
                  for a few weeks so I have no idea how many episodes were made in total.
                </p>
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="Conan O&apos;Brien Needs a Friend"
                presenters={["Conan O'Brien", 'Matt Gourley', 'Sona Movsesian']}
                yearStarted="2018"
                cover="conan.webp"
                cadence="weekly"
                numberOfEpisodes={234}
                isActive={true}
              >
                This wacky but brilliant podcast is laugh out loud funny. Even the
                advertisements are funny. Conan has a unique brand of humour that is both self
                deprecating and insightful.
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="Smartless"
                presenters={['Jason Bateman', 'Sean Hayes', 'Will Arnett']}
                yearStarted="2020"
                cover="smartless.webp"
                cadence="weekly"
                numberOfEpisodes={56}
                isActive={true}
              >
                These three presenters invite a different guest each week and have an in-depth
                conversation.
                <p className="text-xs text-muted-foreground mt-2 line-through">
                  I am listening to a few episodes of this during December 2023 to determine
                  if it is worth the time. I think this is two different podcasts rolled into
                  one.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Now that I&apos;ve listened to a few episodes this is definitely worth the
                  listen. Though I am picky about which episodes I do listen to.
                </p>
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
                              <Podcast
                  title="Working it out"
                  presenters={['Mike Birbiglia']}
                  yearStarted="2020"
                  cover="mike_birbiglia.webp"
                  cadence="weekly"
                  numberOfEpisodes={130}
                  isActive={true}
                >
                Mike Birbiglia is one of my favourite comedians. In this podcast he invites a
                different comedian each week and they discuss the process of joke writing. Along
                the way they deliver many great jokes.
                <p className="text-xs text-muted-foreground mt-2">I&apos;ve stopped listening to this one. I think it was good. But I am not sure that I can afford the time.</p>
              </Podcast>
            </li>
          </ul>
        </section>

        <section>
          <Title title="Tech" subtitle="Podcasts" />
          <ul className="space-y-4">
            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="Soft Skills Engineering"
                presenters={['Jamison Dance', 'Dave Smith']}
                yearStarted="2016"
                cover="soft_skills_engineering.webp"
                cadence="weekly"
                numberOfEpisodes={387}
                isActive={true}
              >
                It takes more than great code to be a software engineer.
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-orange-500 font-bold text-sm block">5/10</span>
              </div>
              <Podcast
                title="The Changelog"
                presenters={['Adam Stacoviak', 'Jerod Santo']}
                yearStarted="2019"
                cover="the_changelog.webp"
                cadence="weekly"
                numberOfEpisodes={678}
                isActive={true}
              >
                Technical interviews and news about the software world.
                <p className="text-xs text-muted-foreground mt-2 line-through">
                  I am listening to a few episodes of this during December 2023 to determine
                  if it is worth the time.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  I&apos;ve temporarily paused this podcast. Not bad, just too many to listen to at
                  the moment.
                </p>
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-orange-500 font-bold text-sm block">5/10</span>
              </div>
              <Podcast
                title="Ship It!"
                presenters={['Gerhard Lazu']}
                yearStarted="2023"
                cover="ship_it.webp"
                cadence="weekly"
                numberOfEpisodes={91}
                isActive={true}
              >
                All about deploying software to production. Interviews with persons in devops
                and infrastructure.
                <p className="text-xs text-muted-foreground mt-2 line-through">
                  I am listening to a few episodes of this during December 2023 to determine
                  if it is worth the time.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  I&apos;ve temporarily paused this podcast. Not bad, just too many to listen to at
                  the moment.
                </p>
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-orange-500 font-bold text-sm block">5/10</span>
              </div>
              <Podcast
                title="Machine Learning Guide"
                presenters={['']}
                yearStarted="2017"
                cover="machine_learning_guide.jpg"
                cadence="weekly"
                numberOfEpisodes={20}
                isActive={true}
              >
                Machine learning fundamentals and interviews with experts in the field.
                <p className="text-xs text-muted-foreground mt-2 line-through">
                  I am listening to a few episodes of this during December 2023 to determine
                  if it is worth the time.
                </p>
                <p className="text-xs text-muted-foreground mt-2">This is definitely not worth it.</p>
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-orange-500 font-bold text-sm block">5/10</span>
              </div>
              <Podcast
                title="Syntax Web Development"
                presenters={['Wes Bos', 'Scott Tolinski']}
                yearStarted="2017"
                cover="syntax.webp"
                cadence="every few days"
                numberOfEpisodes={704}
                isActive={true}
              >
                Discussions about front end technologies. Interviews with experts in the field.
                <p className="text-xs text-muted-foreground mt-2 line-through">
                  I am listening to a few episodes of this during December 2023 to determine
                  if it is worth the time.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  I&apos;ve temporarily paused this podcast. Not bad, just too many to listen to at
                  the moment.
                </p>
              </Podcast>
            </li>

            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-orange-500 font-bold text-sm block">5/10</span>
              </div>
              <Podcast
                title="Hard Fork"
                presenters={['Kevin Roose', 'Casey Newton']}
                yearStarted="2022"
                cover="hard_fork.png"
                cadence="weekly"
                numberOfEpisodes={63}
                isActive={true}
              >
                Discussions about the latest happenings around the tech world.
                <p className="text-xs text-muted-foreground mt-2 line-through">
                  I am listening to a few episodes of this during December 2023 to determine
                  if it is worth the time.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  This one is great. The presenters are quite good. The pace is great.
                </p>
              </Podcast>
            </li>
          </ul>
        </section>

        <section>
          <Title title="Baha'i" subtitle="Podcasts" />
          <ul className="space-y-4">
            <li className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-4">
                <span className="text-3xl">⭐</span>
                <span className="text-yellow-500 font-bold text-sm block">10/10</span>
              </div>
              <Podcast
                title="Baha&apos;i World News Service"
                presenters={['Various']}
                yearStarted="2017"
                cover="bwns.webp"
                cadence="occasionally"
                numberOfEpisodes={36}
                isActive={true}
              >
                Reports on major developments in the Baha&apos;i Worldwide community. Interviews with
                persons working in the field.
              </Podcast>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
