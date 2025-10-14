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
  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
          <CardDescription>Contact us</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input type="email" placeholder="Email" />
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Message" className="h-32" />
        </CardContent>
        <CardFooter>
          <Button>Send</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
