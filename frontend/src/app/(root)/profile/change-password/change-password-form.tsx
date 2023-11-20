"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const changePasswordFormSchema = z.object({
    currentPassword: z.string({
        required_error: "Please enter your current password."
    }),

    newPassword: z.string()
        .min(8, { message: 'Your password must be at least 8 characters long.' })
        .max(128, { message: 'Your password is too long.' }
    ),
    confirmNewPassword: z.string()
        .refine((val) => val === undefined || val === "", { message: "Passwords do not match" }),
})

type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>

export function ChangePasswordForm() {
    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordFormSchema)
    })

    function onSubmit(data: ChangePasswordFormValues) {
        toast({
            title: "You submitted the following values:",
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
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Your current password" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Your new password" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Repeat your new password" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Update password</Button>
            </form>
        </Form>
    )
}