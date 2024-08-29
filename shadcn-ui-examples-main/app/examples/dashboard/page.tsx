import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/app/examples/dashboard/components/date-range-picker";
import { MainNav } from "@/app/examples/dashboard/components/main-nav";
import { Overview } from "@/app/examples/dashboard/components/overview";
import { RecentSales } from "@/app/examples/dashboard/components/recent-sales";
import { Search } from "@/app/examples/dashboard/components/search";
import TeamSwitcher from "@/app/examples/dashboard/components/team-switcher";
import { UserNav } from "@/app/examples/dashboard/components/user-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <div className="hidden flex-col md:flex">
      {/* Header Section */}
      <HeaderSection />

      {/* Main Content Section */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MainContent />
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <TeamSwitcher />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
            </TabsTrigger>
          </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <OverviewSection />
          <SalesAndOverviewSection />
        </TabsContent>
      </Tabs>
    </>
  );
}

function OverviewSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <CardComponent title="Total Revenue" value="$45,231.89" percentage="+20.1% from last month" />
      <CardComponent title="Subscriptions" value="+2350" percentage="+180.1% from last month" />
      <CardComponent title="Sales" value="+12,234" percentage="+19% from last month" />
      <CardComponent title="Active Now" value="+573" percentage="+201 since last hour" />
    </div>
  );
}

function SalesAndOverviewSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            You made 265 sales this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentSales />
        </CardContent>
      </Card>
    </div>
  );
}

interface CardComponentProps {
  title: string;
  value: string;
  percentage: string;
}

function CardComponent({ title, value, percentage }: CardComponentProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <IconPath title={title} />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{percentage}</p>
      </CardContent>
    </Card>
  );
}

interface IconPathProps {
  title: string;
}

function IconPath({ title }: IconPathProps) {
  switch (title) {
    case "Total Revenue":
      return <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />;
    case "Subscriptions":
      return (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      );
    case "Sales":
      return (
        <>
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </>
      );
    case "Active Now":
      return <path d="M22 12h-4l-3 9L9 3l-3 9H2" />;
    default:
      return null;
  }
}
