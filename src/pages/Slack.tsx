import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/context/User";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const Slack = () => {
  const navigate = useNavigate();

  const { slackChannel, setSlackChannel } = useUser();
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChannelSelect = (value: string) => {
    setSlackChannel({ id: value, name: value });
  };

  const handleConnect = async () => {
    if (!slackChannel) {
      setError("Please select a Slack channel before connecting.");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(`Connected to ${slackChannel.name}`);
      setIsConnecting(!isConnecting);
      navigate("/profile");
    } catch (err) {
      setError("Failed to connect to Slack. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto mt-12 max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-lg">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-center">Connect to Slack</h2>
          <p className="text-muted-foreground text-center">
            Select the Slack channel you would like to connect to.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="slack-channel">Slack Channel</Label>
          <Select onValueChange={handleChannelSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Channels</SelectLabel>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="random">Random</SelectItem>
                <SelectItem value="project-a">Project A</SelectItem>
                <SelectItem value="project-b">Project B</SelectItem>
                <SelectItem value="announcements">Announcements</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button
          type="button"
          className="w-full"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect to Slack"}
        </Button>
      </div>
    </div>
  );
};

export default Slack;
