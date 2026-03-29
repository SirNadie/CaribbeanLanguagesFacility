export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The middleware handles authentication protection
  // This layout just provides the structure
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
