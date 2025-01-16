import { Header } from "@/components/Header";
import React from "react";

type props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: props) => {
  return (
    <>
    <Header />
      <main className="px-3 lg:px-14">
        <div>{children}</div>
      </main>
    </>
  );
};

export default DashboardLayout;
