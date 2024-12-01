import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Lost in Space 🚀</h2>
        <h3 className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist, but don't worry, we've got
          you covered!
        </h3>

        <div className="flex text-center justify-center">
          <p>
            <Link href={"/"} className="text-primary">
              Take me Dashboard Home
            </Link>{" "}
            🏠 or <span className="text-primary">Explore more</span> 🔍.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
