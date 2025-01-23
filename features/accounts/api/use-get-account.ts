import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccount = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["accounts", { id }],
    queryFn: async () => {
      const res = await client.api.accounts[":id"].$get({
        param: { id },
      });

      if (!res.ok) {
        throw new Error("Error fetching account");
      }

      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
