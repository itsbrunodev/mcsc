import './globals.css'

export const metadata = {
  title: 'mcsc',
  description: 'Minecraft Server Creator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
