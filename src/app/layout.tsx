import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header>Next.js Demo</header>
        <div>{children}</div>
      </body>
    </html>
  )
}
