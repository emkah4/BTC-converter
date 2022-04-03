import React, { useState } from "react"
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

import styles from './AddField.module.css'

import { useSelector, useDispatch } from "react-redux";
import { eurFieldAdded, usdFieldAdded, gbpFieldAdded } from "../../actions";

const AddField = props => {

    const [enteredBTC, setEnteredBTC] = useState('');
    const [error, setError] = useState('')
    let selectedFIAT = '';

    const isEurAdded = useSelector((state) => state.EUR);
    const isGbpAdded = useSelector((state) => state.GBP);
    const isUsdAdded = useSelector((state) => state.USD);
    const dispatch = useDispatch();

    const addFieldHandler = () => {
      if (enteredBTC.trim().length === 0) {
        setError("Invalid input! Please enter the BTC amount");
        return;
      }

      switch (selectedFIAT) {
        case "EUR":
          if (!isEurAdded) {
            dispatch(eurFieldAdded());
            props.onAddField(enteredBTC, selectedFIAT);
          }
          break;
        case "USD":
          if (!isUsdAdded) {
            dispatch(usdFieldAdded());
            props.onAddField(enteredBTC, selectedFIAT);
          }

          break;
        case "GBP":
          if (!isGbpAdded) {
            dispatch(gbpFieldAdded());
            props.onAddField(enteredBTC, selectedFIAT);
          }
          break;
        default:
          return;
      }
    };

    const inputChangeHandler = (event) => {
      setEnteredBTC(event.target.value);
    };

    const eurButtonHandler = (event) => {
      event.preventDefault();
      selectedFIAT = "EUR";
      addFieldHandler();
    };

    const usdButtonHandler = (event) => {
      event.preventDefault();
      selectedFIAT = "USD";
      addFieldHandler();
    };

    const gbpButtonHandler = (event) => {
      event.preventDefault();
      selectedFIAT = "GBP";
      addFieldHandler()
      
    };

    const errorHandler = () => {
        setError(null)
    }

    return (
      <React.Fragment>
        {error && <ErrorModal error={error} onConfirm={errorHandler}></ErrorModal>}
        <Card className={styles.input}>
          <form>
            <label className={styles.label}>ENTER THE BITCOIN SUM</label>
            <input
              type="number"
              step="0.0001"
              className={styles.input}
              onChange={inputChangeHandler}
            ></input>
            <button className={styles.select} onClick={eurButtonHandler}>
              EUR
            </button>
            <button className={styles.select} onClick={usdButtonHandler}>
              USD
            </button>
            <button className={styles.select} onClick={gbpButtonHandler}>
              GBP
            </button>
          </form>
        </Card>
      </React.Fragment>
    );
}

export default AddField;