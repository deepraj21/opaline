"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import { Tile } from "@/components/site/tile"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/opaline/ui/accordion"
import { ActivityRings } from "@/registry/opaline/ui/activity-rings"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/registry/opaline/ui/avatar"
import { Badge } from "@/registry/opaline/ui/badge"
import { Button } from "@/registry/opaline/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/opaline/ui/card"
import { Checkbox } from "@/registry/opaline/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/opaline/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/opaline/ui/dropdown-menu"
import { Input } from "@/registry/opaline/ui/input"
import { Kbd, KbdGroup } from "@/registry/opaline/ui/kbd"
import { Label } from "@/registry/opaline/ui/label"
import { Progress } from "@/registry/opaline/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/registry/opaline/ui/radio-group"
import { Separator } from "@/registry/opaline/ui/separator"
import { ShimmerText } from "@/registry/opaline/ui/shimmer-text"
import { Skeleton } from "@/registry/opaline/ui/skeleton"
import { Slider } from "@/registry/opaline/ui/slider"
import { Spinner } from "@/registry/opaline/ui/spinner"
import { Switch } from "@/registry/opaline/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/opaline/ui/tabs"
import { Textarea } from "@/registry/opaline/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/opaline/ui/tooltip"

function ProgressDemo() {
  const [value, setValue] = React.useState(24)
  React.useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 8 : v + 12)), 1200)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex w-full max-w-[260px] flex-col gap-2">
      <div className="flex justify-between text-[13px]">
        <span className="font-medium">Uploading</span>
        <span className="text-muted-foreground tabular-nums">{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  )
}

export function CoreSection() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Tile name="button">
        <div className="flex max-w-[280px] flex-wrap items-center justify-center gap-2.5">
          <Button>Continue</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="link">
            Learn more <ArrowUpRightIcon />
          </Button>
        </div>
      </Tile>

      <Tile name="card" className="lg:row-span-2">
        <Card className="w-full max-w-[300px]">
          <CardHeader>
            <CardTitle>Create account</CardTitle>
            <CardDescription>Start building in seconds.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">About</Label>
              <Textarea id="bio" placeholder="A few words…" />
            </div>
            <Label className="text-muted-foreground">
              <Checkbox defaultChecked /> Send me product updates
            </Label>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign up</Button>
          </CardFooter>
        </Card>
      </Tile>

      <Tile name="activity-rings">
        <div className="flex items-center gap-6">
          <ActivityRings
            size={132}
            stroke={14}
            rings={[
              { value: 0.82, color: "#fa114f", label: "Move" },
              { value: 0.64, color: "#a6ff00", label: "Exercise" },
              { value: 0.9, color: "#00e0ff", label: "Stand" },
            ]}
          />
          <div className="flex flex-col gap-2 text-[13px] leading-tight">
            <div>
              <div className="text-muted-foreground">Move</div>
              <div className="font-semibold text-[#fa114f]">410/500 kcal</div>
            </div>
            <div>
              <div className="text-muted-foreground">Exercise</div>
              <div className="font-semibold text-[#7ecb00]">19/30 min</div>
            </div>
            <div>
              <div className="text-muted-foreground">Stand</div>
              <div className="font-semibold text-[#00b8d4]">11/12 hrs</div>
            </div>
          </div>
        </div>
      </Tile>

      <Tile name="switch">
        <div className="flex w-full max-w-[240px] flex-col gap-4">
          {["Focus", "Do Not Disturb", "Low Power"].map((l, i) => (
            <Label key={l} className="justify-between text-sm">
              {l} <Switch defaultChecked={i !== 1} />
            </Label>
          ))}
        </div>
      </Tile>

      <Tile name="tabs">
        <Tabs defaultValue="overview" className="w-full max-w-[300px] items-center">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-center text-sm text-muted-foreground">
            Everything at a glance.
          </TabsContent>
          <TabsContent value="usage" className="text-center text-sm text-muted-foreground">
            2.4k requests this week.
          </TabsContent>
          <TabsContent value="billing" className="text-center text-sm text-muted-foreground">
            Next invoice on Oct 1.
          </TabsContent>
        </Tabs>
      </Tile>

      <Tile name="dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit profile</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Changes are saved to your account instantly.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Ava Chen" />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Save</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Tile>

      <Tile name="dropdown-menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 pl-1.5">
              <Avatar className="size-6">
                <AvatarFallback className="text-[10px]">AC</AvatarFallback>
              </Avatar>
              Ava Chen
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuItem>
              <UserIcon /> Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon /> Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon /> Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOutIcon /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tile>

      <Tile name="accordion">
        <Accordion type="single" collapsible defaultValue="a" className="w-full max-w-[320px]">
          <AccordionItem value="a">
            <AccordionTrigger>Is it shadcn compatible?</AccordionTrigger>
            <AccordionContent>
              Yes. Every component installs with the shadcn CLI and follows
              the same API.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Which browsers refract?</AccordionTrigger>
            <AccordionContent>
              Chromium renders true refraction. Safari and Firefox get a
              frosted fallback.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="c">
            <AccordionTrigger>Can I theme it?</AccordionTrigger>
            <AccordionContent>
              Everything reads from CSS variables — tweak them in your
              globals.css.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Tile>

      <Tile name="radio-group">
        <RadioGroup defaultValue="pro" className="w-full max-w-[240px]">
          {[
            ["starter", "Starter", "$0"],
            ["pro", "Pro", "$12"],
            ["team", "Team", "$29"],
          ].map(([v, l, p]) => (
            <Label key={v} className="justify-between rounded-2xl border border-border px-4 py-3 has-[[data-state=checked]]:border-foreground/30 has-[[data-state=checked]]:bg-foreground/[0.03]">
              <span className="flex items-center gap-3">
                <RadioGroupItem value={v} /> {l}
              </span>
              <span className="text-muted-foreground">{p}</span>
            </Label>
          ))}
        </RadioGroup>
      </Tile>

      <Tile name="slider">
        <div className="flex w-full max-w-[260px] flex-col gap-7">
          <Slider defaultValue={[64]} />
          <Slider defaultValue={[20, 72]} />
        </div>
      </Tile>

      <Tile name="progress">
        <ProgressDemo />
      </Tile>

      <Tile name="badge">
        <div className="flex max-w-[260px] flex-wrap justify-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Shipped</Badge>
          <Badge variant="info">Beta</Badge>
          <Badge variant="destructive">Failed</Badge>
        </div>
      </Tile>

      <Tile name="avatar">
        <AvatarGroup>
          {["AC", "JL", "MR", "SK", "+3"].map((n) => (
            <Avatar key={n} className="size-11">
              <AvatarFallback>{n}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </Tile>

      <Tile name="tooltip">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Crafted with care</TooltipContent>
        </Tooltip>
      </Tile>

      <Tile name="kbd">
        <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            Search <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
          </span>
          <span className="flex items-center gap-2">
            Save <KbdGroup><Kbd>⌘</Kbd><Kbd>S</Kbd></KbdGroup>
          </span>
        </div>
      </Tile>

      <Tile name="spinner">
        <div className="flex items-center gap-6 text-muted-foreground">
          <Spinner />
          <Spinner className="size-7" />
          <Button disabled>
            <Spinner className="size-4" /> Loading
          </Button>
        </div>
      </Tile>

      <Tile name="skeleton">
        <div className="flex w-full max-w-[260px] items-center gap-3">
          <Skeleton className="size-11 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3.5 w-4/5" />
            <Skeleton className="h-3.5 w-3/5" />
          </div>
        </div>
      </Tile>

      <Tile name="shimmer-text">
        <ShimmerText className="text-2xl font-semibold tracking-[-0.03em]">
          Thinking…
        </ShimmerText>
      </Tile>

      <Tile name="separator">
        <div className="flex w-full max-w-[240px] flex-col gap-3 text-sm">
          <div className="font-medium">Opaline</div>
          <Separator />
          <div className="flex h-4 items-center gap-3 text-muted-foreground">
            Glass <Separator orientation="vertical" /> Core
            <Separator orientation="vertical" /> Theme
          </div>
        </div>
      </Tile>
    </div>
  )
}
