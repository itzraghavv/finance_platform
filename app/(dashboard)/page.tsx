import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

// 42.18 hono setup