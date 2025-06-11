import { DataChart } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <DataGrid />
        <DataChart />
      </div>
    </Suspense>
  );
}
