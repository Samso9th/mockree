"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner'

const FormSchema = z.object({
    email: z.string().email({
        message: "Enter a valid email.",
    }),
});

const handleClick = () => {
    window.open('https://9thtech.hashnode.dev/newsletter', '_blank');
};

export function NewsletterForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        form.reset();
        toast.success("We've sent a verification link to this Email:", {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
        handleClick();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-2 sm:max-w-sm"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subscribe to our newsletter</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    className="rounded-full px-4"
                                    placeholder="janedoe@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" size="sm" className="px-4 rounded-full">
                    Subscribe
                </Button>
            </form>
        </Form>
    );
}