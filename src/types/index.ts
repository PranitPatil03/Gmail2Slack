export interface User {
  name: string;
  email: string;
  profilePicture: string;
}

export interface SlackChannel {
  id: string;
  name: string;
}

export interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  slackChannel: SlackChannel | null;
  setSlackChannel: (channel: SlackChannel | null) => void;
}
