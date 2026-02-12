import Title from '@/components/Title';
import { Rocket, Code2, Monitor, Globe, Smartphone, Apple, Zap, Sparkles, Search, Terminal, BarChart3, Gem, ExternalLink } from 'lucide-react';

export default function UsesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-left mb-8 text-[var(--foreground)]">Uses</h1>

      <div className="mb-8">
        <p className="text-[var(--foreground)]">
          Tools I use for software development and technical writing.
        </p>
        <div className="text-sm text-[var(--muted-foreground)] mt-2">
          Inspired by Wes Bos&apos; <a href="https://github.com/wesbos/awesome-uses" className="text-[var(--primary)] hover:text-[var(--primary)]/80 underline">Awesome Uses</a> page.
        </div>
      </div>

      <section className="mb-8">
        <Title title="Code" subtitle="Editors" />
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">IntelliJ IDEA Ultimate Edition</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                Full stack development IDE from JetBrains.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://www.jetbrains.com/idea/"
                title="Jetbrains Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Rocket size={24} />
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Cursor</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                Main code editor. AI features and productivity focus are excellent.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://cursor.sh/"
                title="Cursor Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Code2 size={24} />
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Visual Studio Code (VSCode)</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                Use occasionally. Cursor has largely replaced it for daily work.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://code.visualstudio.com/"
                title="VSCode Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Monitor size={24} />
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Webstorm</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                Excellent IDE. Keep it around for select projects.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://www.jetbrains.com/webstorm/"
                title="Webstorm Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Globe size={24} />
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Android Studio</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                From the same folks that built Webstorm.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://developer.android.com/studio"
                title="Android Studio Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Smartphone size={24} />
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Xcode</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                For iOS development tools and React Native builds.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://developer.apple.com/xcode/"
                title="Xcode Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Apple size={24} />
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
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Emmet</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                Code snippets for HTML and CSS. Available for most IDEs.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://emmet.io/"
                title="Emmet Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Zap size={24} />
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Prettier</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                Code formatter. Works well once configured.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://prettier.io/"
                title="Prettier Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Sparkles size={24} />
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">ESLint</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                Works alongside Prettier for code quality.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://eslint.org/"
                title="ESlint Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Search size={24} />
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
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Zsh</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                Default shell after macOS switched. Good features.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://en.wikipedia.org/wiki/Z_shell"
                title="Zsh Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Terminal size={24} />
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Oh My Zsh</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                Configuration and management for Zsh terminal.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://ohmyz.sh/"
                title="Oh My Zsh Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Zap size={24} />
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Warp</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                Modern terminal with AI features.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://www.warp.dev/"
                title="Warp Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Rocket size={24} />
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
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Things</h3>
              <div className="text-[var(--muted-foreground)] mt-1">Simple, effective todo list.</div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://culturedcode.com/things/"
                title="Things Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80 flex items-center gap-1"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Linear</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                Issue tracking and project management.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://linear.app/"
                title="Linear Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <BarChart3 size={24} />
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Obsidian</h3>
              <div className="text-[var(--muted-foreground)] mt-1">
                For all non-code writing.
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://obsidian.md/"
                title="Obsidian Website"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[var(--primary)] hover:text-[var(--primary)]/80"
              >
                <Gem size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
