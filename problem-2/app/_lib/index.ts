export type CurrencyData = {
    id?: number;
    avatar?: string;
    currency: string;
    date: string;
    price: number;
};

export function processData(currencyData: CurrencyData[]): CurrencyData[] {
    const seenCurrencies = new Set();
    const uniqueData = currencyData.reduce((acc, item) => {
        if (!seenCurrencies.has(item.currency) && item.price !== undefined) {
            seenCurrencies.add(item.currency);
            acc.push({
                ...item,
                id: acc.length + 1,
                avatar: `https://raw.githubusercontent.com/Switcheo/token-icons/65c7313a57660dbd3244d8a4d090e0af647e6532/tokens/${item.currency}.svg?raw=true`,
            });
        }
        return acc;
    }, [] as CurrencyData[]);

    return uniqueData;
}

export function swapPriceAmount(amount: number, currPrice1: number, currPrice2: number) {
    return (amount / currPrice1) * currPrice2;
}

export function referenceAmount(curr1: string, curr2: string, currPrice1: number, currPrice2: number) {
    return "1 " + curr1 + " = " + (1 / currPrice1) * currPrice2 + " " + curr2;
}
