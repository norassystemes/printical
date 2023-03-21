## PDF Print Component `🖨️ Printical`

This is a simple component to print or download pdf from a react component.

- ✅ Typescript
- ✅ Fully customizable
- 😞 ReactJS only

## Install

```sh
npm install printical
```

```sh
pnpm add printical
```

```sh
yarn add printical
```

## Usage

```ts
import Printical from "printical";

const Demo = () => {
  return (
    <Printical
      trigger={({ download }) => <button onClick={download}>⏬</button>}
    >
      // ... your component/s
    </Printical>
  );
};

// OR

import { usePrintical } from "printical";

const Demo = () => {
  const { print, download, Printical } = usePrintical(opts);

  return (
    <>
      <button onClick={print}>🖨️</button>
      <button onClick={download}>⏬</button>
      <Printical>{// ... your component/s}</Printical>
    </>
  );
};
```

## Interface

```ts
type TriggerArgs = {
  print: () => void;
  download: () => void;
  downloading: boolean;
  custom: () => void;
};
type TriggerFunction = (args: TriggerArgs) => JSX.Element;

/// https://github.com/eKoopmans/html2pdf.js
type PDFOptions = {
  /**
   * PDF margin (in jsPDF units). Can be a single number, [vMargin, hMargin], or [top, left, bottom, right].
   */
  margin?: number | [number, number, number, number];
  filename?: string;
  /**
   * Controls the pagebreak behavior on the page. See Page-breaks below.
   * https://ekoopmans.github.io/html2pdf.js/#page-breaks
   */
  pagebreak?: {
    mode?: ("avoid-all" | "css" | "legacy")[];
    before?: string | string[];
    after?: string | string[];
    avoid?: string | string[];
  };
  image?: {
    type: "jpeg" | "png" | "webp";
    /**
     * The quality of the image. Only applies to JPEG images.
     * 0 is the lowest quality, 1 is the highest quality.
     */
    quality: number;
  };
  enableLinks?: boolean;
  /**
   * Configuration options sent directly to html2canvas (see here for usage).
   * https://html2canvas.hertzen.com/configuration
   */
  html2canvas?: {
    allowTaint?: boolean;
    backgroundColor?: string;
    canvas?: HTMLCanvasElement | null;
    foreignObjectRendering?: boolean;
    imageTimeout?: number;
    ignoreElements?: (element: HTMLElement) => boolean;
    logging?: boolean;
    onclone?: ((document: Document) => void) | null;
    proxy?: string | null;
    removeContainer?: boolean;
    scale?: Window["devicePixelRatio"];
    useCORS?: boolean;
    width?: HTMLCanvasElement["width"];
    height?: HTMLCanvasElement["height"];
    x?: HTMLCanvasElement["offsetLeft"];
    y?: HTMLCanvasElement["offsetTop"];
    scrollX?: Element["scrollLeft"];
    scrollY?: Element["scrollTop"];
    windowWidth?: Window["innerWidth"];
    windowHeight?: Window["innerHeight"];
  };
  /**
   * Configuration options sent directly to jsPDF (see here for usage)
   * https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html
   */
  jsPDF?: {
    orientation?: "portrait" | "landscape";
    unit?: "pt" | "mm" | "cm" | "in" | "px" | "pc" | "em" | "ex";
    format?:
      | "a0" - "a10"
      | "b0" - "b10"
      | "c0" - "c10"
      | "d1"
      | "letter"
      | "government-letter"
      | "legal"
      | "junior-legal"
      | "ledger"
      | "tabloid"
      | "credit-card"
      | [number, number];
    putOnlyUsedFonts?: boolean;
    compress?: boolean;
    precision?: number;
    userUnit?: number;
    hotfixes?: string[];
    encryption?: {
      userPassword?: string;
      ownerPassword?: string;
      userPermissions?: ("print" | "modify" | "copy" | "annot-forms")[];
    };
    floatPrecision?: number;
  };
};

// https://github.com/gregnb/react-to-print
type IReactToPrintProps = {
    /** Class to pass to the print window body */
    bodyClass?: string;
    children?: React.ReactNode;
    /** Content to be printed */
    content: () => React.ReactInstance | null;
    /** Copy styles over into print window. default: true */
    copyStyles?: boolean;
    /** Set the title for printing when saving as a file */
    documentTitle?: string;
    /** */
    fonts?: Font[];
    /** Callback function to trigger after print */
    onAfterPrint?: () => void;
    /** Callback function to trigger before page content is retrieved for printing */
    onBeforeGetContent?: () => void | Promise<any>;
    /** Callback function to trigger before print */
    onBeforePrint?: () => void | Promise<any>;
    /** Callback function to listen for printing errors */
    onPrintError?: (errorLocation: "onBeforeGetContent" | "onBeforePrint" | "print", error: Error) => void;
    /** Override default print window styling */
    pageStyle?: string | PropertyFunction<string>;
    /** Override the default `window.print` method that is used for printing */
    print?: (target: HTMLIFrameElement) => Promise<any>;
    /** Remove the iframe after printing. */
    removeAfterPrint?: boolean;
    /** Suppress error messages */
    suppressErrors?: boolean;
    /** Trigger action used to open browser print */
    trigger?: <T>() => React.ReactElement<ITriggerProps<T>>;
    /** Set the nonce attribute for whitelisting script and style -elements for CSP (content security policy) */
    nonce?: string;
}

```

## Props

### Printical

| Name          | Type                 | Required | Description                          |
| ------------- | -------------------- | -------- | ------------------------------------ |
| `children`    | `JSX.Element`        | true     | The component/s to print             |
| `trigger`     | `TriggerFunction`    | false    | The trigger to print or generate pdf |
| `pdfOptions`  | `PDFOptions`         | false    | The options to generate the pdf      |
| `customPrint` | `IReactToPrintProps` | false    | The options to print the html        |

### usePrintical

| Name          | Type                 | Required | Description                     |
| ------------- | -------------------- | -------- | ------------------------------- |
| `pdfOptions`  | `PDFOptions`         | false    | The options to generate the pdf |
| `customPrint` | `IReactToPrintProps` | false    | The options to print the html   |

### Notes

- when using `customPrint` option, a `custom` trigger is available to use in the `trigger` prop

```ts
const { custom } = usePrintical({ customPrint: { ... } });

<Printical customPrint={...} trigger={({ custom }) => {}} ... />
```

```ts
const { custom, Printical } = usePrintical({
  customPrint: { pageStyle: "..." },
});

<button onClick={custom}>✨</button>;
```
