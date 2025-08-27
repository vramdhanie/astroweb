export default function Footer() {
  return (
    <footer className="grow-0 shrink-0 py-6 text-xs text-center mt-8 text-muted-foreground border-t border-border">
      <div className="flex justify-center space-x-4 mb-2">
        <a href="https://github.com/vramdhanie" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://twitter.com/vramdhanie" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://linkedin.com/in/vramdhanie" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      <div>&copy; {new Date().getFullYear()} Vincent Ramdhanie • Built with <a href="https://nextjs.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Next.js</a></div>
    </footer>
  );
}
