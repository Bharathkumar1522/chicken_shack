import '../styles/styles.css';

export const metadata = {
  title: 'Chicken Shack',
  description: 'The crispiest bite. Experience the award-winning flavor sensation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700,500,600,300&display=swap" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/f118869e56.js" crossOrigin="anonymous" defer></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
