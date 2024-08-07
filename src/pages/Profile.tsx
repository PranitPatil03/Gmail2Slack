import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useUser } from "@/context/User";

const UserProfile = () => {
  const { user, slackChannel, setSlackChannel } = useUser();
  const [error, setError] = React.useState<string | null>(null);

  const disconnectGmail = () => {
    console.log("Disconnecting from Gmail...");
    setError(null);
  };

  const disconnectSlack = () => {
    console.log("Disconnecting from Slack...");
    setError(null);
    setSlackChannel(null);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>User not found. Please log in.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto mt-12 max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-lg">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.profilePicture} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="text-xl font-bold">{user.name}</div>
            <div className="text-muted-foreground">{user.email}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Connected to Slack:</div>
            {slackChannel ? (
              <Badge variant="secondary">{slackChannel.name}</Badge>
            ) : (
              <Badge variant="outline">Not Connected</Badge>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={disconnectGmail}
              disabled={!user.email}
            >
              Disconnect from Gmail
            </Button>
            <Button
              variant="outline"
              onClick={disconnectSlack}
              disabled={!slackChannel}
            >
              Disconnect from Slack
            </Button>
          </div>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
