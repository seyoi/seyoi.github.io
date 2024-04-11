"use client";
import CardMaker from "@/app/components/CardMaker/CardMaker";
import { useAuth } from "@/app/contexts/AuthContext";

const Page = () => {
  const {
    userState,
    email,
    setEmail,
    password,
    setPassword,
    signIn,
    signOutUser,
    handleSignUp,
    error,
  } = useAuth();
  console.log(userState);
  return (
    <>
      <div className="">
        <CardMaker />
      </div>
      <div>
        {userState ? (
          <>
            <div>
              Email:
              {userState &&
                Object.keys(userState).map((key) => (
                  <div key={key}>{key === "email" && userState[key]}</div>
                ))}{" "}
            </div>
            <p>Status: Authenticated</p>
            <button onClick={signOutUser}>Sign out</button>
          </>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button onClick={signIn}>Sign in</button>
            <button onClick={handleSignUp}>Sign up</button>
            {error && <p>Error: {error}</p>}
          </>
        )}
      </div>{" "}
    </>
  );
};

export default Page;
