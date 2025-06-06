import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";

import { insertTransactionsSchema } from "@/db/schema";

import { convertAmountToMiliunits } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { AmountInput } from "@/components/amount-input";

import {
  Form,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Select } from "@/components/select";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionsSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOption: { label: string; value: string }[];
  categoryOption: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOption,
  categoryOption,
  onCreateCategory,
  onCreateAccount,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    const amount = parseFloat(values.amount);
    const amountInMiliunits = convertAmountToMiliunits(amount);

    onSubmit({
      ...values,
      amount: amountInMiliunits,
    });
  }

    const handleDelete = () => {
      onDelete?.();
    };

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 pt-4"
        >
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker
                    onChange={field.onChange}
                    value={field.value}
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="accountId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Account
                  <FormControl>
                    <Select
                      placeholder="Select an Account"
                      options={accountOption}
                      onCreate={onCreateAccount}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={disabled}
                    />
                  </FormControl>
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Category
                  <FormControl>
                    <Select
                      placeholder="Select a Category"
                      options={categoryOption}
                      onCreate={onCreateCategory}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={disabled}
                    />
                  </FormControl>
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            name="payee"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Payee
                  <FormControl>
                    <Input
                      placeholder="Add a payee"
                      disabled={disabled}
                      {...field}
                    />
                  </FormControl>
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Amount
                  <FormControl>
                    <AmountInput
                      {...field}
                      disabled={disabled}
                      placeholder="0.00 "
                    />
                  </FormControl>
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            name="notes"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Notes
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      disabled={disabled}
                      placeholder="Optional notes"
                    />
                  </FormControl>
                </FormLabel>
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={disabled}>
            {id ? "Save changes" : "Create Transaction"}
          </Button>
          {!!id && (
            <Button
              onClick={handleDelete}
              className="w-full"
              variant="outline"
              type="button"
              disabled={disabled}
            >
              <Trash className="size-4 mr-2" />
              Delete Transaction
            </Button>
          )}
        </form>
      </Form>
    );
  };
