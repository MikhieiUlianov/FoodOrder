import { createContext, ReactNode, useState } from "react";

type UserProgressIdentifier = "" | "cart" | "checkout" | "thanks";

const UserProgressContext = createContext({
  progress: "",
  setUserProgress: (identifier: UserProgressIdentifier) => {},
});

export function UserProgressContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userProgress, setUserProgress] = useState<UserProgressIdentifier>("");

  const userProgressCtx = {
    progress: userProgress,
    setUserProgress,
  };
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
