import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";


export default function Home() {
  return (
    <main>
      <div className="py-16 px-16">
        <Card className="w-[500px] my-6">
          <CardContent className="grid gap-4 mt-6">
            <div className="grid gap-17">
              <h2 className="text-4xl font-semibold tracking-tight">
                SmartCash
              </h2>
            </div>
            <div className="grid gap-2">
              <h2>
                You&apos;ll always find your personal accountant in the pocket!...
              </h2>
            </div>
            <div className="grid gap-2">
              <Button asChild={true} style={{backgroundColor: "powderblue"}}>
                <a href="/signUp">Sign Up</a>
              </Button>
            </div>
            <div className="grid gap-2">
              <Button asChild={true} style={{backgroundColor: "powderblue"}}>
                <a href="/logIn">Log In</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
