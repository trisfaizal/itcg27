import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ITCG 2027: KOMITKABE 6th IT Community Gathering',
  description: 'Komunitas IT Kawasan Industri (KOMITKABE): 6th IT Community Gathering 2027. Intelligence in Motion: Driving Smart Industry. Securing the Future. Sutan Raja Hotel and Convention Centre, Soreang, Bandung.',
  keywords: ['ITCG 2027', 'KOMITKABE', 'IT Community Gathering', 'Sutan Raja Hotel', 'Soreang Bandung', 'Industrial IoT', 'Cybersecurity', 'AI Manufaktur'],
  icons: {
    icon: '/images/itcg-logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth font-body">
      <body className="min-h-screen bg-white text-itcg-navy antialiased selection:bg-itcg-blue selection:text-white">
        {children}
      </body>
    </html>
  );
}
