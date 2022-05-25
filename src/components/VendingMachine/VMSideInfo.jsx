import { MachineDispatchContext, MachineStateContext } from "contexts/MachineProvider";
import { WalletDispatchContext } from "contexts/WalletProvider";
import React, { useContext, useMemo } from "react";
import { API, convertMoneyUnit } from "utils";

const VMSideInfo = () => {
  const { totalMoney } = useContext(MachineStateContext);

  const totalMoneyKR = useMemo(() => convertMoneyUnit(totalMoney), [totalMoney]);

  return (
    <div className="flex flex-col gap-4 p-4 w-[30%] min-h-[680px] text-lg">
      <HistoryInfo />
      <RemainTimeBox />
      <InputMoneyBox totalMoneyKR={totalMoneyKR} />
      <ReturnButton totalMoney={totalMoney} />
    </div>
  );
};

const HistoryInfo = () => {
  return <div className="p-2 h-[70%] text-base rounded-2xl border-4 border-starbucks">하이</div>;
};

const RemainTimeBox = () => {
  return (
    <div className="flex justify-between">
      <span>남은시간</span>
      <div className="flex">
        <span className="mr-1 w-24 text-xl font-semibold text-right">10</span>
        <div>초</div>
      </div>
    </div>
  );
};

const InputMoneyBox = ({ totalMoneyKR }) => {
  const handleChange = (e) => {
    console.log("e.target.value :>> ", e.target.value);
  };

  return (
    <>
      <div className="flex justify-between">
        <span>넣은금액</span>
        <div className="flex justify-end items-center rounded-xl hover:ring-2">
          <input
            className="mr-1 w-24 text-xl font-semibold text-right bg-transparent outline-none cursor-pointer"
            value={totalMoneyKR}
            onChange={handleChange}
          />
          <div>원</div>
        </div>
      </div>
    </>
  );
};

const ReturnButton = ({ totalMoney }) => {
  const { onReturnMoney } = useContext(MachineDispatchContext);
  const { onPullCoin } = useContext(WalletDispatchContext);

  const isZeroMoney = totalMoney <= 0;

  const handleReturnCoin = async () => {
    const { data: moneyData } = await API.getMoneyData();
    const calcMoneyData = returnMoneyLogic(moneyData);
    onPullCoin(calcMoneyData);
    onReturnMoney();
  };

  const returnMoneyLogic = (moneyData) => {
    const returnMoneyData = moneyData.reduceRight((prev, curr) => {
      const moneyUnit = curr.money;
      const quotient = Math.floor(totalMoney / moneyUnit);

      if (quotient > 0) {
        totalMoney %= moneyUnit;
        return [{ ...curr, count: quotient }, ...prev];
      }

      return prev;
    }, []);

    return returnMoneyData;
  };

  return (
    <button
      className={`${isZeroMoney && "pointer-events-none"} py-4 text-xl btn btn--starbucks`}
      onClick={handleReturnCoin}
    >
      반환하기
    </button>
  );
};

export default VMSideInfo;
