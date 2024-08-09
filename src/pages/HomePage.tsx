/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChromeIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { authWithGoogle } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import { UserInfo } from "firebase/auth";

interface ServerResponse {
  user: UserInfo;
  token: string;
}

const HomePage = () => {
  const [error, setError] = useState<string | null>(null);

  const handleGoogleAuth = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    authWithGoogle()
      .then(({user,accessToken }) => {
        if (!accessToken) {
          throw new Error("No access token found");
        }

        const serverRoute = "/auth/google";
        const formData = { accessToken };

        userAuthFromServer(serverRoute, formData);
      })
      .catch((err) => {
        toast.error("Something went wrong, Try Again");
        console.error(err);
      });
  };

  const userAuthFromServer = (
    serverRoute: string,
    formData: { accessToken: string }
  ) => {
    axios
      .post<ServerResponse>(
        `${import.meta.env.VITE_SERVER_DOMAIN}${serverRoute}`,
        formData
      )
      .then(({ data }) => {
        console.log("Data ==>", data);
        toast.success("Login successful ✅");
      })
      .catch(({ response }) => {
        toast.error(response?.data.error || "Server error occurred");
      });
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <Toaster />
        <div className="w-max-8xl">
          <div className="mx-auto max-w-lg space-y-6 rounded-lg border bg-card p-8 shadow-lg">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-muted-foreground">
                Sign in with your Google account to connect to Slack.
              </p>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleAuth}
            >
              <ChromeIcon className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
