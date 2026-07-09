import Title from '@/components/Title';
import {
  Bot,
  MessageSquare,
  Orbit,
  SquareTerminal,
  Layers,
  Code2,
  Monitor,
  Globe,
  Smartphone,
  Apple,
  Zap,
  Sparkles,
  ShieldCheck,
  Terminal,
  Wrench,
  ListTodo,
  CircleDot,
  Gem,
} from 'lucide-react';

interface UsesItem {
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

interface UsesSection {
  title: string;
  subtitle: string;
  items: UsesItem[];
}

const SECTIONS: UsesSection[] = [
  {
    title: 'Artificial',
    subtitle: 'Intelligence',
    items: [
      {
        name: 'Claude',
        description:
          'My main AI. Claude Code does a lot of my day-to-day coding while I review, and I use the app to think through designs before anything gets built.',
        url: 'https://claude.ai/',
        icon: <Bot size={24} />,
      },
      {
        name: 'ChatGPT',
        description:
          'Quick questions and second opinions. Useful for getting an answer from outside my usual toolchain.',
        url: 'https://chatgpt.com/',
        icon: <MessageSquare size={24} />,
      },
      {
        name: 'Gemini',
        description:
          'Mostly for long documents — the large context window earns its keep.',
        url: 'https://gemini.google.com/',
        icon: <Orbit size={24} />,
      },
      {
        name: 'Warp',
        description:
          'The agent in my terminal. Good for fixing a failing command without breaking flow.',
        url: 'https://www.warp.dev/',
        icon: <SquareTerminal size={24} />,
      },
    ],
  },
  {
    title: 'Code',
    subtitle: 'Editors',
    items: [
      {
        name: 'IntelliJ IDEA Ultimate Edition',
        description:
          'My IDE for big multi-language projects. The refactoring tools are still unmatched.',
        url: 'https://www.jetbrains.com/idea/',
        icon: <Layers size={24} />,
      },
      {
        name: 'Cursor',
        description:
          'Main editor for daily work. The AI integration fits how I actually write code.',
        url: 'https://cursor.sh/',
        icon: <Code2 size={24} />,
      },
      {
        name: 'Visual Studio Code (VSCode)',
        description: 'Still installed, rarely opened — Cursor replaced it for daily work.',
        url: 'https://code.visualstudio.com/',
        icon: <Monitor size={24} />,
      },
      {
        name: 'Webstorm',
        description: "JetBrains' web IDE. I keep it around for a few older projects.",
        url: 'https://www.jetbrains.com/webstorm/',
        icon: <Globe size={24} />,
      },
      {
        name: 'Android Studio',
        description: 'For the rare Android build. Based on IntelliJ, so it feels familiar.',
        url: 'https://developer.android.com/studio',
        icon: <Smartphone size={24} />,
      },
      {
        name: 'Xcode',
        description: 'Only when a React Native build needs the iOS toolchain.',
        url: 'https://developer.apple.com/xcode/',
        icon: <Apple size={24} />,
      },
    ],
  },
  {
    title: 'Editor',
    subtitle: 'Configurations',
    items: [
      {
        name: 'Emmet',
        description: 'HTML and CSS expansion shortcuts. Muscle memory at this point.',
        url: 'https://emmet.io/',
        icon: <Zap size={24} />,
      },
      {
        name: 'Prettier',
        description:
          'Formats everything, so I never argue about style — with myself or anyone else.',
        url: 'https://prettier.io/',
        icon: <Sparkles size={24} />,
      },
      {
        name: 'ESLint',
        description: 'Catches the mistakes Prettier cannot. Every project gets a config.',
        url: 'https://eslint.org/',
        icon: <ShieldCheck size={24} />,
      },
    ],
  },
  {
    title: 'Terminals',
    subtitle: '',
    items: [
      {
        name: 'Zsh',
        description: 'My shell since macOS made it the default. Never felt a reason to leave.',
        url: 'https://en.wikipedia.org/wiki/Z_shell',
        icon: <Terminal size={24} />,
      },
      {
        name: 'Oh My Zsh',
        description: 'Manages my Zsh config, prompt, and plugins.',
        url: 'https://ohmyz.sh/',
        icon: <Wrench size={24} />,
      },
      {
        name: 'Warp',
        description: 'My daily terminal. Blocks and searchable command history done right.',
        url: 'https://www.warp.dev/',
        icon: <SquareTerminal size={24} />,
      },
    ],
  },
  {
    title: 'Productivity',
    subtitle: 'Tools',
    items: [
      {
        name: 'Things',
        description: 'Personal todo list. Simple enough that I actually keep it up to date.',
        url: 'https://culturedcode.com/things/',
        icon: <ListTodo size={24} />,
      },
      {
        name: 'Linear',
        description: 'Issue tracking at work. Fast enough that filing a ticket is not a chore.',
        url: 'https://linear.app/',
        icon: <CircleDot size={24} />,
      },
      {
        name: 'Obsidian',
        description: 'All non-code writing lives here, in plain Markdown.',
        url: 'https://obsidian.md/',
        icon: <Gem size={24} />,
      },
    ],
  },
];

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

      {SECTIONS.map((section) => (
        <section key={`${section.title}-${section.subtitle}`} className="mb-8">
          <Title title={section.title} subtitle={section.subtitle} />
          <div className="space-y-6">
            {section.items.map((item) => (
              <div key={item.name} className="flex items-start space-x-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.name}</h3>
                  <div className="text-[var(--muted-foreground)] mt-1 max-w-prose">
                    {item.description}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href={item.url}
                    title={`${item.name} website`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-[var(--primary)] hover:text-[var(--primary)]/80"
                  >
                    {item.icon}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
