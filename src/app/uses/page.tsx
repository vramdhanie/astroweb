import Title from '../../components/Title';

export default function UsesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8 font-mono border-b pb-2 border-slate-200">Uses</h1>
      
      <div className="mb-6">
        <p className="text-foreground">
          Below is a list of tools and environments that I use in my daily work as a software
          developer, lecturer and technical writer.
        </p>
        <div className="text-sm text-muted-foreground mt-2">
          Inspired by Wes Bos&apos; <a href="https://github.com/wesbos/awesome-uses" className="text-primary hover:text-primary/80 underline">Awesome Uses</a> page.
        </div>
      </div>

      <section className="mb-8">
        <Title title="Code" subtitle="Editors" />
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">IntelliJ IDEA Ultimate Edition</h3>
              <div className="text-muted-foreground mt-1">
                Jetbrains has always produced amazing IDEs. I use the Ultimate Edition for
                full stack development at Lindy. It is a paid product but well worth it.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://www.jetbrains.com/idea/"
                title="Jetbrains Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">🚀</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Cursor</h3>
              <div className="text-muted-foreground mt-1">
                Currently my main code editor. The AI features and
                productivity focus are fantastic.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://cursor.sh/"
                title="Cursor Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">✏️</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Visual Studio Code (VSCode)</h3>
              <div className="text-muted-foreground mt-1">
                Became my main code editor in 2018 taking over from Webstorm. I still
                use it occasionally but Cursor has largely replaced it for daily work.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://code.visualstudio.com/"
                title="VSCode Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">💻</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Webstorm</h3>
              <div className="text-muted-foreground mt-1">
                Webstorm is an excellent IDE. I very reluctantly moved over to VSCode and
                still keep it around and use on a few select projects just because it is so
                great.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://www.jetbrains.com/webstorm/"
                title="Webstorm Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">🌐</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Android Studio</h3>
              <div className="text-muted-foreground mt-1">
                Built by the same folks that brought you Webstorm and many other amazing
                IDEs.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://developer.android.com/studio"
                title="Android Studio Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">🤖</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Xcode</h3>
              <div className="text-muted-foreground mt-1">
                Don&apos;t use this so much as an editor but rather use many of the tools that
                are available with Xcode. Also needed for generating iOS apps from React
                Native.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://developer.apple.com/xcode/"
                title="Xcode Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">🍎</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <Title title="Editor" subtitle="Configurations" />
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Emmet</h3>
              <div className="text-muted-foreground mt-1">
                An amazing time saving plugin for generating code snippets for HTML and CSS.
                Available for most IDEs.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://emmet.io/"
                title="Emmet Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">⚡</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Prettier</h3>
              <div className="text-muted-foreground mt-1">
                Alright, some controversy exist over this, but I have no problem with
                prettier formatting my code for me after I set up the rules that I like.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://prettier.io/"
                title="Prettier Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">✨</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">ESLint</h3>
              <div className="text-muted-foreground mt-1">
                Sometimes ESLint and prettier gets into a fight but both are useful so its
                worth making them work together.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://eslint.org/"
                title="ESlint Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">🔍</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <Title title="Terminals" subtitle="" />
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Zsh</h3>
              <div className="text-muted-foreground mt-1">
                Adopted this after macOS did. Spent years on Bash. There are a few features
                of Zsh that I like but so far no impactful difference.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://en.wikipedia.org/wiki/Z_shell"
                title="Zsh Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">💻</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Oh My Zsh</h3>
              <div className="text-muted-foreground mt-1">
                Pretty decent tool for configuring and managing the Zsh terminal. I may have
                used less than 1% of the goodies that it offers so far but I&apos;m happy with
                it.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://ohmyz.sh/"
                title="Oh My Zsh Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">⚡</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Warp</h3>
              <div className="text-muted-foreground mt-1">
                Modern terminal with AI features and a focus on productivity.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://www.warp.dev/"
                title="Warp Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">🚀</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <Title title="Productivity" subtitle="Tools" />
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Things</h3>
              <div className="text-muted-foreground mt-1">Amazing what a simple todo list can do.</div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://culturedcode.com/things/"
                title="Things Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                Things
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Linear</h3>
              <div className="text-muted-foreground mt-1">
                Issue tracking and project management that actually feels good to use.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://linear.app/"
                title="Linear Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">📊</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Obsidian</h3>
              <div className="text-muted-foreground mt-1">
                Super extendable and feature rich text editor. For all my non-code writing.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://obsidian.md/"
                title="Obsidian Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-primary hover:text-primary/80 underline"
              >
                <span className="text-2xl">💎</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
