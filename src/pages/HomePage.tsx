import { Button } from "@/components/ui/button";
import { ChromeIcon } from "lucide-react";
import { useNavigate} from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleLogin=()=>{
    navigate("/slack")
  }

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-max-8xl">
          <div className="mx-auto max-w-lg space-y-6 rounded-lg border bg-card p-8 shadow-lg">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-muted-foreground">
                Sign with your Google to connect to Slack.
              </p>
            </div>
            <Button variant="outline" className="w-full" onClick={handleLogin}>
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
