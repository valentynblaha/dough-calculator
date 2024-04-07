import React from "react";
import "./LocaleSelect.css";
import { languages } from "../i18n";

type LocaleSelectProps = {
  value: string;
  onChange: (e: string) => void;
};

export default function LocaleSelect({ value, onChange }: Readonly<LocaleSelectProps>) {
  return (
    <select
      className="locale-select"
      onChange={e => onChange(e.target.value)}
      value={value}
      style={{ backgroundImage: "url(" + languages[value].flag + ")", backgroundSize: "cover"}}
    >
      {Object.keys(languages).map(code => {
        const lang = languages[code];
        return (
          <option value={code} key={code}>
            {lang.label}
          </option>
        );
      })}
    </select>
  );
}
