import React from "react";
import Card from "./Card";
import styles from './ErrorModal.module.css'

const ErrorModal = (props) => {
  return (
    <div className={styles.backdrop} onClick={props.onConfirm}>
      <Card classes={styles.modal}>
        <div className={styles.content}>
          <p>{props.error}</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.close} onClick={props.onConfirm} type>Okay!</button>
        </div>
      </Card>
    </div>
  );
};

export default ErrorModal;