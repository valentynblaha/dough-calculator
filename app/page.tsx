"use client";
import numberLocale from "./utils/format";
import { useState } from "react";
import useLocale from "./hooks/useLocale";
import LocaleSelect from "./components/LocaleSelect";
import ThemeSwitch from "./components/ThemeSwitch";
import Field from "./components/Field";

type Field = {
  name: string;
  type: "text" | "select";
  default: number;
  labelI18n: string;
  max?: number;
  min?: number;
};

const fields: Array<Field> = [
  { name: "starter-hydration", type: "text", default: 1, labelI18n: "starterHydration", max: 1, min: 0 },
  { name: "dough-hydration", type: "text", default: 0.65, labelI18n: "doughHydration", max: 1, min: 0 },
  { name: "starter-ratio", type: "text", default: 0.3, labelI18n: "starterRatio", max: 1, min: 0 },
  { name: "flour-total", type: "text", default: 500, labelI18n: "flourTotal" },
  { name: "flour-added", type: "text", default: 0, labelI18n: "flourAdded" },
  { name: "water-added", type: "text", default: 0, labelI18n: "waterAdded" },
  { name: "starter", type: "text", default: 0, labelI18n: "starter" },
  { name: "salt", type: "text", default: 0, labelI18n: "salt" },
];

const defaultValues: Record<string, string> = {};
for (const field of fields) {
  defaultValues[field.name] = field.default.toString();
}

const getVal = (obj: Record<string, string>, key: string) => {
  return Number.parseFloat(obj[key]);
};

export default function Home() {
  const calculateValues = (v: Record<string, string>) => {
    const format = (val: number) => numberLocale.format(val);
    v["starter"] = format(getVal(v, "starter-ratio") * getVal(v, "flour-total"));
    v["flour-added"] = format(
      getVal(v, "flour-total") - getVal(v, "starter") / (1 + getVal(v, "starter-hydration"))
    );
    v["water-added"] = format(
      getVal(v, "dough-hydration") * getVal(v, "flour-total") -
        (getVal(v, "starter") * getVal(v, "starter-hydration")) / (1 + getVal(v, "starter-hydration"))
    );
    v["salt"] = format(0.025 * getVal(v, "flour-total"));
    return v;
  };

  const [values, setValues] = useState(calculateValues(defaultValues));
  const { setLocale, getI18n, locale } = useLocale();
  return (
    <div>
      <div
        className="flex flex-row items-center justify-end"
        style={{ margin: "1em 1em 0 1em" }}
      >
        <div className="select" style={{ marginRight: "1em" }}>
          <LocaleSelect onChange={value => setLocale(value)} value={locale} />
        </div>
        <ThemeSwitch />
      </div>
      <h1 className="text-3xl">{getI18n("title")}</h1>
      <form className="fields-container">
        {fields.map(field => (
          <Field
            key={field.name}
            id={field.name}
            value={values[field.name]}
            label={getI18n(field.labelI18n)}
            onChange={val => {
              const v = { ...values, [field.name]: val };
              setValues(calculateValues(v));
            }}
            min={field.min}
            max={field.max}
          />
        ))}
      </form>
    </div>
  );
}
