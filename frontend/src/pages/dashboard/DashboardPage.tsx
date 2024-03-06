import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { CalendarDateRangePicker } from "../../components/dashboard/date-range-picker";
import { MainNav } from "../../components/dashboard/main-nav";
import { Overview } from "../../components/dashboard/overview";
import { RecentSales } from "../../components/dashboard/recent-sales";
import { Search } from "../../components/dashboard/search";
import TeamSwitcher from "../../components/dashboard/team-switcher";
import { UserNav } from "../../components/dashboard/user-nav";
import StadisticCard from "../../components/dashboard/stat-card";
import {
  LuCreditCard,
  LuDollarSign,
  LuTrendingUp,
  LuUsers,
} from "react-icons/lu";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col flex">
        {/* <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div> */}
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              {/* <Button>Download</Button> */}
              <UserNav />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StadisticCard
                title={"Total Revenue"}
                icon={<LuDollarSign />}
                stat={"$45,231.89"}
                commentary={"+20.1% from last month"}
              />
              <StadisticCard
                title={"Subscriptions"}
                icon={<LuUsers />}
                stat={"+2350"}
                commentary={"+180.1% from last month"}
              />
              <StadisticCard
                title={"Sales"}
                icon={<LuCreditCard />}
                stat={"+12,234"}
                commentary={"+19% from last month"}
              />
              <StadisticCard
                title={"Active Now"}
                icon={<LuTrendingUp />}
                stat={"+573"}
                commentary={"+201 since last hour"}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 grid-cols-1">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-2">
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
          </div>
        </div>
      </div>
    </>
  );
}
