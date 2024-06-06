interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // added blockchain property of type string
    priority: number; // added priority property of type number
}

// removed FormattedWalletBalance type as we don't need it

interface Props extends BoxProps {}

// brought priority mapping outside the component to avoid recalculating it multiple times
const blockchainPriority: { [key: string]: number } = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
};

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: string): number => {
        // replaced type any of type string
        return blockchainPriority[blockchain] ?? -99;
    };

    // combined filtering, sorting, and mapping into a single useMemo hook
    const sortedBalances = useMemo(() => {
        return balances
            .map((balance: WalletBalance) => ({
                ...balance,
                priority: getPriority(balance.blockchain), // added property: priority to replace the undefined "lhsPriority"
            }))
            .filter((balance) => balance.priority > -99 && balance.amount > 0)
            .sort((lhs: WalletBalance, rhs: WalletBalance) => rhs.priority - lhs.priority); // added type WalletBalance for lhs and rhs
    }, [balances]); // removed prices dependency

    const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow className={classes.row} key={index} amount={balance.amount} usdValue={usdValue} formattedAmount={balance.amount.toFixed()} />
        );
    });

    return <div {...rest}>{rows}</div>;
};

export default WalletPage;
