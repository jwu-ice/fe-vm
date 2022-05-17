import { WalletDispatchContext } from "contexts/WalletProvider";
import React, { useContext, useEffect } from "react";
import { convert2MoneyUnit } from "utils";

const MoneyUnitItem = ({ id, money, count, type }) => {
  const { onPushCoin } = useContext(WalletDispatchContext);

  const handleInsertMoney = () => {
    if (count <= 0) {
      console.log("정지");
      return;
    }
    onPushCoin(id);
  };

  return (
    <div key={id} className="flex justify-end items-center w-[90%]">
      <button
        className={`${styledMoneyType(type)} btn btn--starbucks leading-8 `}
        onClick={handleInsertMoney}
      >
        {convert2MoneyUnit(money, "kr")}원
      </button>
      <div className="">X</div>
      <span className={`${styledNoCount(count)} w-[30%] text-right`}>{count}개</span>
    </div>
  );
};

const styledMoneyType = (type) => {
  switch (type) {
    case "coin":
      return "rounded-full w-[70px] h-[70px] mr-12 tracking-tight";

    case "bill":
      return "rounded-none w-[140px] h-[70px] mr-6";

    default:
      return;
  }
};

const styledNoCount = (count) => {
  if (count <= 0) {
    return "empty-money";
  }
};

export default React.memo(MoneyUnitItem);
