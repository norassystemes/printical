import * as React from "react";
import { Printical, usePrintical } from ".";

export const Playground = () => {
  const { Printical: P, print } = usePrintical();

  return (
    <P>
      <div>
        <h1>Playground</h1>
        <p>
          <button onClick={print}>🖨️ Print</button>
        </p>
      </div>
    </P>
  );
};

function test() {
  return "";
}
