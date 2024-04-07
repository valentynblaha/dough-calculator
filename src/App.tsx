import { useState } from "react";
import "./App.css";
import Field from "./Field";
import LocaleSelect from "./components/LocaleSelect";
import ThemeSwitch from "./components/ThemeSwitch";
import { getI18n } from "./i18n";
import numberLocale from "./utils/format";

const fields = [
  {
    name: "starter-hydration",
    type: "text",
    default: 1.0,
    label: "starterHydration",
    min: 0,
    max: 1,
  },
  {
    name: "dough-hydration",
    type: "text",
    default: 0.65,
    label: "doughHydration",
    min: 0,
    max: 1,
  },
  {
    name: "starter-ratio",
    type: "text",
    default: 0.3,
    label: "starterRatio",
    min: 0,
    max: 1,
  },
  { name: "flour-total", type: "text", default: 500, label: "flourTotal" },
  { name: "flour-added", type: "text", default: 0, label: "flourAdded" },
  { name: "water-added", type: "text", default: 0, label: "waterAdded" },
  { name: "starter", type: "text", default: 0, label: "starter" },
  { name: "salt", type: "text", default: 0, label: "salt" },
];

const defaultValues: Record<string, string> = {};
for (const field of fields) {
  defaultValues[field.name] = field.default.toString();
}

const getVal = (obj: Record<string, string>, key: string) => {
  return Number.parseFloat(obj[key]);
};

function App() {
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
  const [language, setLanguage] = useState("it");

  const i18n = (key: string) => getI18n(key, language);

  return (
    <div>
      <div
        className="d-flex flex-row align-items-center justify-content-end"
        style={{ margin: "1em 1em 0 1em" }}
      >
        <div className="select" style={{ marginRight: "1em" }}>
          <LocaleSelect onChange={value => setLanguage(value)} value={language} />
        </div>
        <ThemeSwitch />
      </div>
      <h1>{i18n("title")}</h1>
      <form className="fields-container">
        {fields.map(field => (
          <Field
            key={field.name}
            id={field.name}
            value={values[field.name]}
            label={i18n(field.label)}
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

export default App;
