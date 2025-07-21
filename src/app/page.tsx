import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PremarketScreener from '@/components/screener/PremarketScreener';

export default function Home() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back Migue!</h2>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening in the market today.
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="screener" className="space-y-4">
        <TabsList>
          <TabsTrigger value="screener">Premarket Screener</TabsTrigger>
          <TabsTrigger value="watchlist" disabled>Watchlist</TabsTrigger>
          <TabsTrigger value="news" disabled>News</TabsTrigger>
        </TabsList>
        
        <TabsContent value="screener" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Premarket Movers</CardTitle>
              <CardDescription>
                Track the biggest premarket movers and set up alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <PremarketScreener />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="watchlist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Watchlist</CardTitle>
              <CardDescription>
                Your personalized watchlist of stocks to monitor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Your watchlist is empty. Add some stocks to get started.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
