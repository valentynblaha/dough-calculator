import { useEffect, useRef } from "react";
import { setInputFilter } from "./utils/customValidity";

export interface IFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
}

export default function Field({ id, label, value, onChange, min, max }: Readonly<IFieldProps>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputFilter(
      inputRef.current,
      value => {
        return /^\d*\.?\d*$/.test(value);
      },
      "Il valore deve essere un numero"
    );
  }, [inputRef]);

  useEffect(() => {
    
    if (typeof min === "number") {
      setInputFilter(
        inputRef.current,
        value => {
          const n = Number.parseFloat(value);
          return !isNaN(n) && n >= min;
        },
        "Il valore deve essere maggiore o uguale a " + min
      );
    }
  }, [inputRef, min])

  useEffect(() => {
    
    if (typeof max === "number") {
      setInputFilter(
        inputRef.current,
        value => {
          const n = Number.parseFloat(value);
          return !isNaN(n) && n <= max;
        },
        "Il valore deve essere minore o uguale a " + max
      );
    }
  }, [inputRef, max])

  const labelId = id + "-label";
  return (
    <div className="field-container">
      <div className="field-label">
        <label id={labelId} htmlFor={id}>
          {label}
        </label>
      </div>
      <div className="field-input">
        <input
          ref={inputRef}
          aria-labelledby={labelId}
          id={id}
          type="search"
          value={value}
          autoComplete="off"
          autoCapitalize="none"
          inputMode="decimal"
          onChange={e => onChange(e.target.value)}
        ></input>
      </div>
    </div>
  );
}
