"use client"

import * as z from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { cn } from "@/lib/utils"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const editProfileFormSchema = z.object({
    firstName: z.string()
        .max(20, 'Your name must not have more than 20 characters')
        .min(2, 'Your name must have at least 2 characters'),

    lastName: z.string()
        .max(20, 'Your name must not have more than 20 characters')
        .min(2, 'Your name must have at least 2 characters'),

    bio: z.string()
        .max(200, 'Your name must not have more than 200 characters')
        .optional(),

    status: z.string().optional(),
    urls: z.array(z.object({
        value: z.string().url({ message: 'Please enter a valid URL' })
    })).optional()
})

type editProfileFormValues = z.infer<typeof editProfileFormSchema>;

const defaultValues: Partial<editProfileFormValues> = {
    urls: [
        { value: 'https://example.com' }
    ]
}

export function EditProfileForm() {
    const form = useForm<editProfileFormValues>({
        resolver: zodResolver(editProfileFormSchema),
        defaultValues,
        mode: "onChange"
    })

    const { fields, append, remove } = useFieldArray({
        name: "urls",
        control: form.control,
    })

    const [readOnlyFields, setReadOnlyFields] = useState<number[]>([])


    function onSubmit(data: editProfileFormValues) {
        const urls = data.urls || [];

        const readOnlyUrls = readOnlyFields.map(index => urls[index])

        const payload = {
            ...data,
            urls: readOnlyUrls
        }

        console.log('submit data', payload);
        toast({
            title: `Submitted:`,
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(payload, null, 2)}</code>
                </pre>
            ),
        })
    }

    const handleAddUrl = () => {
        setReadOnlyFields((prev) => [...prev, fields.length - 1])
        append({ value: "" })
    }

    const handleRemoveUrl = (index: number) => {
        setReadOnlyFields((prev) => prev.filter((i) => i !== index))
        remove(index)
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
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div>
                    {fields.map((field, index) => (
                        <FormField
                            control={form.control}
                            key={field.id}
                            name={`urls.${index}.value`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                                        URLs
                                    </FormLabel>
                                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                                        Add links to your website, blog or social media profiles.
                                    </FormDescription>
                                    <FormControl>
                                        <div className="flex items-center space-x-5">
                                            <Input
                                                {...field}
                                                readOnly={readOnlyFields.includes(index)}
                                                className={readOnlyFields.includes(index) ? "text-muted-foreground" : ""}
                                            />
                                            {readOnlyFields.includes(index) && (
                                                <button
                                                    type="button"
                                                    className="ml-2 text-muted-foreground"
                                                    onClick={() => handleRemoveUrl(index)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            )}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={handleAddUrl}
                    >
                        Add URL
                    </Button>
                </div>
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an activity status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="offline">Offline</SelectItem>
                                    <SelectItem value="idle">Idle</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>You can select a custom activity status</FormDescription>
                        </FormItem>
                    )}
                />
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}