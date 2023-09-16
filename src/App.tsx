import { useState } from "react";
import Field from "./Field";
import "./App.css";
import numberLocale from "./utils/format";

const fields = [
  {
    name: "starter-hydration",
    type: "text",
    default: 1.0,
    label: "Idratazione lievito madre (0.0 - 1.0)",
    min: 0,
    max: 1,
  },
  {
    name: "dough-hydration",
    type: "text",
    default: 0.65,
    label: "Idratazione impasto (0.0 - 1.0)",
    min: 0,
    max: 1,
  },
  {
    name: "starter-ratio",
    type: "text",
    default: 0.3,
    label: "Percentuale lievito madre (0.0 - 1.0)",
    min: 0,
    max: 1,
  },
  { name: "flour-total", type: "text", default: 500, label: "Quantità farina totale (g)" },
  { name: "flour-added", type: "text", default: 0, label: "Quantità farina aggiunta (g)" },
  { name: "water-added", type: "text", default: 0, label: "Quantità acqua aggiunta (g o ml)" },
  { name: "starter", type: "text", default: 0, label: "Quantità lievito madre (g)" },
  { name: "salt", type: "text", default: 0, label: "Sale (g)" },
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
    v["starter"] = format((getVal(v, "starter-ratio") * getVal(v, "flour-total")));
    v["flour-added"] = format((
      getVal(v, "flour-total") -
      getVal(v, "starter") / (1 + getVal(v, "starter-hydration"))
    ));
    v["water-added"] = format((
      getVal(v, "dough-hydration") * getVal(v, "flour-total") -
      (getVal(v, "starter") * getVal(v, "starter-hydration")) / (1 + getVal(v, "starter-hydration"))
    ));
    v["salt"] = format((0.025 * getVal(v, "flour-total")));
    return v;
  }

  const [values, setValues] = useState(calculateValues(defaultValues));

  return (
    <>
      <div>
        <h1>Calcolatore per impasti</h1>
        <form className="fields-container">
          {fields.map(field => (
            <Field
              key={field.name}
              id={field.name}
              value={values[field.name]}
              label={field.label}
              onChange={val => {
                const v = {...values, [field.name]: val};
                setValues(calculateValues(v))
              }}
              min={field.min}
              max={field.max}
            />
          ))}
        </form>
      </div>
    </>
  );
}

export default App;
