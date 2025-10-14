"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSend = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    console.log("Send button clicked!")
    console.log("Form data:", { name, email, message })

    const subject = `Contact from ${name || "Website Visitor"}`
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`

    const mailtoUrl = `mailto:info@thinkhome.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    console.log("Generated mailto URL:", mailtoUrl)

    // Try multiple approaches to open mailto
    try {
      window.open(mailtoUrl, "_self")
    } catch (error) {
      console.error("Error opening mailto:", error)
      // Fallback
      window.location.href = mailtoUrl
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 relative z-10">
      <Card className="relative z-10">
        <CardHeader>
          <CardTitle>Contact</CardTitle>
          <CardDescription>Contact us</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Message"
            className="flex h-32 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button type="button" onClick={handleSend}>
            Send
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
