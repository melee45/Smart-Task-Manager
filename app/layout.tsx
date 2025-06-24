import './globals.css';
import { ReactNode } from 'react';
import { SessionWrapper } from './session-wrapper';

export const metadata = {
  title: 'Smart Task Manager',
  description: 'A full-stack task manager with analytics',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
