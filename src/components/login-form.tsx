import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your FlowAid account
                </p>
              </div>
              <div className="grid gap-2 text-start">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Patient Unique Id</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="anon_2142"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
              >
                Login
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHh0M3U2NDB5bmJmenA0MHJwMHFyMm42cWN1Ymx4NXF5czM3aXpnZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Rk2vpkjp446amkIwIz/giphy.gif"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale p-10 bg-green-500"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
