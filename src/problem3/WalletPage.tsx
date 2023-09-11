interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props; // should remove children because not use it anywhere
  const balances = useWalletBalances();
  const prices = usePrices();

  // Property "blockchain" should be use "number" type
  // const getPriority = (blockchain: number)  => {...
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return (
      balances
        .filter((balance: WalletBalance) => {
          // type of balance have not define "blockchain"
          // should add property "blockchain" to the interface WalletBalance
          // The balancePriority variable is declared but not used

          const balancePriority = getPriority(balance.blockchain);

          // lhsPriority variable has not been declared. This line will be error
          // variable "lhsPriority" should be replaced with "balancePriority"
          if (lhsPriority > -99) {
            if (balance.amount <= 0) {
              return true;
            }
          }
          return false;
        })
        // This is now work because function filter is error
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          // lhs và rhs không có property "blockchain"
          // Variable names are unclear
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          }
        })
    );
    // Dependency "prices" not use in this filter. Should be remove it because it may cause unnecessary rerender
  }, [balances, prices]);

  // array formattedBalances is declared but not used
  // this array will error because sortedBalances is error
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // this array rows will error because sortedBalances is error
  // should use array "formattedBalances" because array "formattedBalances" is mapped from array "sortedBalances"
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
          // object classes have not been declared
          // should be create object classes for style
          // should replace "key={index}" with "key={balance.balanceId} because index is the position of the array it can cause the array position to change and cause the component to be rerendered unnecessarily
        <WalletRow
          className={classes.row} 
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
