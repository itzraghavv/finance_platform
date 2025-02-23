import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  value?: Date;
  onChange?: SelectSingleEventHandler;
  disabled?: boolean;
};

export const DatePicker = ({ value, onChange, disabled }: Props) => {
<<<<<<< HEAD
  
=======
  const dateValue =
    value instanceof Date && !isNaN(value.getTime()) ? value : undefined;
>>>>>>> 1b89a0a0cad5f6de9778df8f0589c95b5e495215
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
<<<<<<< HEAD
            "w-full justify-start text-left font-normal ",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="size-4 mr-2 " />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ pointerEvents: "auto" }}>
=======
            "w-full justify-start font-normal text-left",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="size-4 mr-2" />
          {value ? format(value, "PPP") : <span>Pick a Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
>>>>>>> 1b89a0a0cad5f6de9778df8f0589c95b5e495215
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
<<<<<<< HEAD
=======

// TODO- debug the calendar it is unable to select the date
>>>>>>> 1b89a0a0cad5f6de9778df8f0589c95b5e495215
