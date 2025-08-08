import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

import './app.css';
import Header from '@/components/Header'; // *************************** Header 컴포넌트

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className='overflow-x-hidden bg-yellow-300'>
                {/* ***************************** Header 컴포넌트 추가  */}
                <Header /> {children}
            </body>
            <PrismicPreview repositoryName={repositoryName} />
        </html>
    );
}
