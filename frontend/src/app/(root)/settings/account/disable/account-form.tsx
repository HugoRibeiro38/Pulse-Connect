"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const deactivationReasons = [
  { label: "No longer using the service", value: "no_longer_using" },
  { label: "Privacy concerns", value: "privacy_concerns" },
  { label: "Found another platform", value: "found_alternative" },
  { label: "Technical issues", value: "technical_issues" },
  { label: "Other reasons", value: "other" },
] as const;

const accountFormSchema = z.object({
  accountDeactivationReason: z.string({
    required_error: "Please select a reason for account deactivation.",
  }),
  password: z.string()
});


type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="accountDeactivationReason"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Reason for account deactivation</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? deactivationReasons.find(
                          (reason) => reason.value === field.value
                        )?.label
                        : "Select reason"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search reason..." />
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                      {deactivationReasons.map((reason) => (
                        <CommandItem
                          value={reason.label}
                          key={reason.value}
                          onSelect={() => {
                            form.setValue(
                              "accountDeactivationReason",
                              reason.value
                            );
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              reason.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {reason.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="flex flex-col">
          <FormLabel>Enter your password</FormLabel>
          <FormControl>
            <Input
              type="password" // Set the type attribute to "password"
              placeholder="Your password"
              {...form.register('password')}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </form>
    </Form>
  );
}