'use client'
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { useForm } from "react-hook-form"
import { toast } from '@/components/ui/use-toast';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';

interface ConfirmationDialogProps {
    onClose?: () => void;
}

const accountDeactivationReasons = [
    { label: "No longer using the service", value: "no_longer_using" },
    { label: "Privacy concerns", value: "privacy_concerns" },
    { label: "Account security issues", value: "security_issues" },
    { label: "Technical difficulties", value: "technical_difficulties" },
    { label: "Unsatisfactory user experience", value: "unsatisfactory_experience" },
    { label: "Other reasons", value: "other" },
] as const;

const disableFormSchema = z.object({
    reason: z.string({
        required_error: "Please select an option",
    }),
    password: z.string({
        required_error: "This field is required",
    })
})

type DisableFormValues = z.infer<typeof disableFormSchema>

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ onClose }) => {
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleConfirm = () => {
        // Add your logic here to handle the confirmation, e.g., submit a request to the server
        toast({
            title: "You submitted the following values:",
            description: JSON.stringify(form.getValues(), null, 2),
        });

    };

    const form = useForm<DisableFormValues>({
        resolver: zodResolver(disableFormSchema)
    })

    function onSubmit(data: DisableFormValues) {
        toast({
          title: "You submitted the following values:",
          description: JSON.stringify(data, null, 2), // Convert the React element to a string
        });
      }
      

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant='default' className='place-self-end'>
                    Next
                    <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Account disable form</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name='reason'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>Wny do you wish to leave our service?</FormLabel>
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
                                                            ? accountDeactivationReasons.find(
                                                                (reason) => reason.value === field.value
                                                            )?.label
                                                            : "Select option"}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search option..." />
                                                    <CommandEmpty>No option found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {accountDeactivationReasons.map((reason) => (
                                                            <CommandItem
                                                                value={reason.label}
                                                                key={reason.value}
                                                                onSelect={() => {
                                                                    form.setValue("reason", reason.value)
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
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Please enter your current password</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} autoFocus>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmationDialog;
