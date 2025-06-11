"use client";

import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";

import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";
import { Suspense } from "react";

export default function CategoriesPage() {
  const newCategory = useNewCategory();
  const categoryQuery = useGetCategories();
  const deleteCategories = useBulkDeleteCategories();

  const categories = categoryQuery.data || [];
  const isDisabled = categoryQuery.isLoading || deleteCategories.isPending;

  if (categoryQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-400 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Categories Page
            </CardTitle>
            <Button onClick={newCategory.onOpen} size="sm">
              <Plus className="size-4 mr-2" />
              Add New
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              filterKey="name"
              columns={columns}
              data={categories}
              onDelete={(row) => {
                const ids = row.map((r) => r.original.id);
                deleteCategories.mutate({ ids });
              }}
              disabled={isDisabled}
            />
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}
