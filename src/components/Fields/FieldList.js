import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import styles from "./FieldList.module.css";
import Field from "../UI/Field";
import { ReactComponent as Remove } from "../../assets/trash-can-svgrepo-com.svg";

const FieldList = (props) => {
  useEffect(() => {
    setList(props.fields);
  },[props.fields]);

  const [list, setList] = useState([]);

  const removeFieldHandler = (id, fiat) => {
    props.onRemoveField(id, fiat);
  };

  if (list.length > 0) {
    return (
      <Card className={styles.card}>
        {list.map((field) => (
          <Field key={field.id}>
            <div className={styles.content}>
              {field.btc} ₿ = {field.sign}{field.price} {field.fiat}
            </div>
            <Remove
              className={styles.remove}
              onClick={() => removeFieldHandler(field.id, field.fiat)}
            ></Remove>
          </Field>
        ))}
      </Card>
    );
  } else {
    return null;
  }
};

export default FieldList;
