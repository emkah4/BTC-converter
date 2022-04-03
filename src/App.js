import React, { useState, useEffect } from "react";
import AddField from "./components/Fields/AddField";
import FieldList from "./components/Fields/FieldList";

import { useDispatch } from "react-redux";
import { eurFieldRemoved, gbpFieldRemoved, usdFieldRemoved } from "./actions";

function App() {
  const [fieldList, setFieldList] = useState([]);
  const [listEmpty, setListEmpty] = useState(true);
  const [error, setError] = useState(null);

  var priceForOneBTC;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("log");
  //   }, 60000);

  //   return () => clearInterval(interval); // prevent memory leaks
  // }, []);

  // const updatePrices = () => {
  //   fieldList.forEach(element => console.log(element))
  //   console.log('log')
  // }

  async function fetchCurrentPriceHandler(currency) {
    setError(null);

    try {
      const responce = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );

      if (!responce.ok) {
        throw new Error("Error!");
      }

      const data = await responce.json();

      priceForOneBTC = data.bpi[currency].rate;
      
    } catch (error) {
      setError(error.message);
    }
  }

  if (error) {
    console.log(error);
  }

  const addFieldHandler = (btcAmount, currency) => {
    fetchCurrentPriceHandler(currency).then(() => {
      let priceForOne = priceForOneBTC.replaceAll(",", "");
      let price = parseFloat(btcAmount) * parseFloat(priceForOne);
      let sign;

      switch (currency) {
        case "EUR":
          sign = "€";
          break;
        case "USD":
          sign = "$";
          break;
        case "GBP":
          sign = "£";
          break;
        default:
          return;
      }

      setFieldList((prevFieldList) => {
        return [
          ...prevFieldList,
          {
            btc: btcAmount,
            price: price.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            }),
            fiat: currency,
            sign: sign,
            id: Math.random().toString(),
          },
        ];
      });
    });

    if (!fieldList.length) {
      setListEmpty(false)
    }
  };

  const removeFieldHanlder = (id, fiat) => {
    const newList = fieldList.filter((field) => field.id !== id);
    setFieldList(newList);

    switch (fiat) {
      case "EUR":
        dispatch(eurFieldRemoved());
        break;
      case "USD":
        dispatch(usdFieldRemoved());
        break;
      case "GBP":
        dispatch(gbpFieldRemoved());
        break;
      default:
        return;
    }
  };

  return (
    <React.Fragment>
      <AddField onAddField={addFieldHandler} />
      {!listEmpty && (
        <FieldList fields={fieldList} onRemoveField={removeFieldHanlder} />
      )}
    </React.Fragment>
  );
}

export default App;
