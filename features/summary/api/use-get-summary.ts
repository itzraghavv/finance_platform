import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMiliunits } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const res = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!res.ok) {
        throw new Error("Error fetching summary");
      }

      const { data } = await res.json();
      return {
        ...data,
        incomeAmount: convertAmountFromMiliunits(data.incomeAmount),
        expensesAmount: convertAmountFromMiliunits(data.expensesAmount),
        remainingAmount: convertAmountFromMiliunits(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMiliunits(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromMiliunits(day.income),
          expenses: convertAmountFromMiliunits(day.expense),
        })),
      };
    },
  });
  return query;
};
