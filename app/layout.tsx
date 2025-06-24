import './globals.css';
import { ReactNode } from 'react';
import { SessionWrapper } from './session-wrapper';
import { Toaster } from 'react-hot-toast';

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
          <Toaster position="top-right" reverseOrder={false} />
        </SessionWrapper>
      </body>
    </html>
  );
}
