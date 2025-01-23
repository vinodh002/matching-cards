import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 text-center text-white/80">
      <p className="flex items-center justify-center gap-4">
        Made with ❤️ by Vinodh Kumar
        <a
          href="https://www.linkedin.com/in/vinodhkumar102/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-200"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/vinodhkumar102"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors duration-200"
        >
          <Github className="w-5 h-5" />
        </a>
      </p>
    </footer>
  );
}