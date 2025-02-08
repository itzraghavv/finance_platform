import { z } from "zod";
import { insertAccountSchema, insertTransactionsSchema } from "@/db/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";

import {
  Form,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";

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
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    // onSubmit(values);
    console.log(values);
  };

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
                  value={field.value}
                  onChange={field.onChange}
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
                Name
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
        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create Account"}
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
            Delete Account
          </Button>
        )}
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
                <FormControl>
                  <Select
                    placeholder="Select an Category"
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
        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create Category"}
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
            Delete Category
          </Button>
        )}
      </form>
    </Form>
  );
};
