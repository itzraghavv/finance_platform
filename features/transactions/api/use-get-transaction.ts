import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { convertAmountFromMiliunits } from "@/lib/utils";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const res = await client.api.transactions[":id"].$get({
        param: { id },
      });

      if (!res.ok) {
        throw new Error("Error fetching transaction");
      }

      const { data } = await res.json();
      return {
        ...data,
        amount: convertAmountFromMiliunits(data.amount),
      };
    },
  });
  return query;
};
