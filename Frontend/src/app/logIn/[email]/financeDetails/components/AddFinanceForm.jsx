"use client";

import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar"
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import * as z from "zod";
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { addFinanceDetails } from "@/services/api_integration";


const formSchema = z.object({
    date: z.date({
        required_error: "The curent date of entry is required.",
    }),
});

export function AddFinanceForm({ className, email, ...props }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(data) {
        setIsLoading(true);
        await addFinanceDetails(email, data.date, data.account, data.budget, data.groceries, data.shopping, data.savings);
        window.location.href = `/logIn/${encodeURIComponent(email)}/financeDetails`;
    }

    return (
        <Card className="w-[500px] my-6">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-4 mt-6">                        
                        <div className="grid gap-2">
                            <FormField
                                control={control}
                                name="account"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Account Value</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={control}
                                name="budget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>This Week&apos;s Budget</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=" "
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={control}
                                name="groceries"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Groceries</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={control}
                                name="shopping"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Shopping Expenses</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={control}
                                name="savings"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Savings</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Entry: </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isLoading}
                            style={{backgroundColor: "powderblue"}}
                        >
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Place Detail
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
