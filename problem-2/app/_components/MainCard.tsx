"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { currencyData } from "@/lib/currencyData";

import { ArrowLeftRight } from "lucide-react";

import toast from "react-hot-toast";

import { CurrencyData, processData, referenceAmount, swapPriceAmount } from "../_lib";

export function MainCard() {
    const [currencyOne, setCurrencyOne] = useState<CurrencyData>();
    const [currencyTwo, setCurrencyTwo] = useState<CurrencyData>();
    const [currList, setCurrList] = useState<CurrencyData[]>([]);
    const [amountSent, setAmountSent] = useState(0);
    const [amountReceive, setAmountReceive] = useState<number>();

    function swapCurrency() {
        setCurrencyOne(currencyTwo);
        setCurrencyTwo(currencyOne);
        amountSent != 0
            ? setAmountReceive(swapPriceAmount(amountSent, currencyTwo?.price as number, currencyOne?.price as number))
            : setAmountReceive(0);
    }

    async function getInitialData() {
        const filteredCurrencyData = processData(currencyData);

        setCurrencyOne(filteredCurrencyData[0]);
        setCurrencyTwo(filteredCurrencyData[1]);
        setCurrList(filteredCurrencyData);
    }

    useEffect(() => {
        getInitialData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.success("🎉 You have converted successfully!!!");
    };

    return (
        <div className=" container mx-auto mt-10 px-5 lg:px-10  ">
            <Card className="dark:bg-white">
                <CardContent className="flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row items-center justify-around mt-4">
                    <div className="flex flex-col justify-center gap-y-2  border-b-2">
                        <Label className="dark:text-muted-foreground text-2xl opacity-50 " htmlFor="payAmount">
                            Amount to sent
                        </Label>
                        {/* Currency List 1 */}
                        <div>
                            <Select
                                required
                                value={currencyOne}
                                onValueChange={(value: CurrencyData) => {
                                    setCurrencyOne(value);
                                    amountSent != 0
                                        ? setAmountReceive(swapPriceAmount(amountSent, value.price, currencyTwo?.price as number))
                                        : setAmountReceive(0);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Countries</SelectLabel>
                                        {currList.map((listItem) => (
                                            <SelectItem key={listItem.currency} value={listItem}>
                                                <span className="flex items-center gap-x-2">
                                                    <img width={24} height={24} src={listItem.avatar} />
                                                    <span>{listItem.currency}</span>
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Input
                            type="number"
                            className="  placeholder:text-lg  placeholder:font-light border-none text-2xl  font-bold focus-visible:ring-offset-0 focus-visible:ring-0 "
                            id="payAmount"
                            name="payAmount"
                            min={0}
                            onChange={(e) => {
                                e.preventDefault();
                                setAmountSent(+e.target.value);
                                e.target.value != ""
                                    ? setAmountReceive(
                                          swapPriceAmount(Number(e.target.value), currencyOne?.price as number, currencyTwo?.price as number)
                                      )
                                    : setAmountReceive(0);
                            }}
                            placeholder="Enter your amount here"
                        />
                    </div>
                    {/* Reverse button */}
                    <div
                        className="border-4 p-4 cursor-pointer rounded-full bg-slate-200 dark:bg-slate-800  hover:bg-opacity-50"
                        onClick={() => swapCurrency()}
                    >
                        <ArrowLeftRight width={50} height={50} />
                    </div>
                    <div className="flex flex-col justify-center gap-y-2  border-b-2">
                        <Label className="dark:text-muted-foreground text-2xl opacity-50" htmlFor="payAmount">
                            Amount to receive
                        </Label>
                        {/* Currency list 2 */}
                        <div>
                            <Select
                                required
                                value={currencyTwo}
                                onValueChange={(value: CurrencyData) => {
                                    setCurrencyTwo(value);
                                    amountSent != 0
                                        ? setAmountReceive(swapPriceAmount(amountSent, value.price, currencyOne?.price as number))
                                        : setAmountReceive(0);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Countries</SelectLabel>
                                        {currList.map((listItem) => (
                                            <SelectItem key={listItem.currency} value={listItem}>
                                                <span className="flex items-center gap-x-2">
                                                    <img height={24} width={24} src={listItem.avatar} />
                                                    <span>{listItem.currency}</span>
                                                </span>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Input
                            type="number"
                            className="  placeholder:text-lg placeholder:font-bold border-none text-2xl  font-bold focus-visible:ring-offset-0 focus-visible:ring-0 "
                            id="amountReceive"
                            name="amountReceive"
                            min={0}
                            disabled
                            defaultValue={0}
                            value={amountReceive}
                            onChange={(e) => {
                                e.preventDefault();
                                setAmountReceive(Number(e.target.value));
                            }}
                        />
                    </div>
                </CardContent>
                <Separator />
                <CardFooter className="flex justify-between items-center  mt-2 gap-y-2">
                    <div className="flex flex-col ">
                        <h1 className="text-lg font-bold dark:text-black">*Notes:</h1>
                        <span className="dark:text-black">
                            1 {currencyOne?.currency} = {currencyOne?.price}
                        </span>
                        <span className="dark:text-black">
                            1 {currencyTwo?.currency} = {currencyTwo?.price}
                        </span>
                        <h1 className="text-lg font-bold dark:text-black">*References:</h1>
                        <span className="dark:text-black">
                            {referenceAmount(
                                currencyOne?.currency as string,
                                currencyTwo?.currency as string,
                                currencyOne?.price as number,
                                currencyTwo?.price as number
                            )}
                        </span>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger>
                            {amountSent !== 0 && (
                                <span className="p-5 rounded-md bg-primary text-white dark:bg-white dark:text-black border">Convert</span>
                            )}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <form onSubmit={handleSubmit}>
                                <input className="hidden" type="hidden" name="amountSent" value={amountSent} />
                                <input className="hidden" type="hideen" name="amountReceive" value={amountReceive} />
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone.{" "}
                                        <span className="font-bold">
                                            {amountSent} {currencyOne?.currency}
                                        </span>{" "}
                                        will be converted to{" "}
                                        <span className="font-bold">
                                            {amountReceive} {currencyTwo?.currency}
                                        </span>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction type="submit">Submit</AlertDialogAction>
                                </AlertDialogFooter>
                            </form>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
    );
}
