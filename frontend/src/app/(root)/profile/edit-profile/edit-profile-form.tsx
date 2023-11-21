"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import { CheckIcon } from "@radix-ui/react-icons"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

const displayStatusOptions = [
    { label: 'Online', value: 'online' },
    { label: 'Offline', value: 'offline' },
    { label: 'Idle', value: 'idle' }
] as const

const editProfileFormSchema = z.object({
    firstName: z.string().max(20, 'Your name must not have more than 20 characters'),
    lastName: z.string().max(20, 'Your name must not have more than 20 characters'),
    bio: z.string().max(200, 'Your name must not have more than 200 characters'),
    status: z.string()
})

type editProfileFormValues = z.infer<typeof editProfileFormSchema>;

export function EditProfileForm() {
    const form = useForm<editProfileFormValues>({
        resolver: zodResolver(editProfileFormSchema)
    })

    function onSubmit(data: editProfileFormValues) {
        console.log('submit data', data);
        toast({
            title: `Submitted:`,
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <>
                                    <Input type='text' placeholder='John' {...field} />
                                    <FormMessage>{form.formState.errors.firstName?.message}</FormMessage>
                                </>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <>
                                    <Input type='text' placeholder='Doe' {...field} />
                                    <FormMessage>{form.formState.errors.lastName?.message}</FormMessage>
                                </>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Biography</FormLabel>
                            <FormControl>
                                <>
                                    <Input type='text' placeholder='Tell us something about yourself...' {...field} />
                                    <FormMessage>{form.formState.errors.bio?.message}</FormMessage>
                                </>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Status</FormLabel>
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
                                            {field.value ? displayStatusOptions.find((option) => option.value === field.value)?.label : "Select option"}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput>
                                            <CommandGroup>
                                                {displayStatusOptions.map((option) => (
                                                    <CommandItem
                                                        value={option.label}
                                                        key={option.value}
                                                        onSelect={() => {
                                                            form.setValue("status", option.value)
                                                        }}
                                                    >
                                                        <CheckIcon
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                option.value === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {option.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandInput>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                This is the activity status that will be displayed in your profile.
                            </FormDescription>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}