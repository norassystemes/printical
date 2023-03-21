import * as React from "react";
import type { IReactToPrintProps } from "react-to-print";
import { useReactToPrint } from "react-to-print";
import type { PDFOptions, TriggerFunction } from "./types";
const ID = "printical__print";

interface PrinticalProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[];
  trigger?: TriggerFunction;
  customPrint?: IReactToPrintProps;
  pdfOptions: PDFOptions;
}
const Printical = React.forwardRef<HTMLDivElement, PrinticalProps>(
  ({ children, trigger, customPrint, pdfOptions, ...props }, ref) => {
    const id = ID;
    const componentRef = React.useRef<HTMLDivElement>(null);

    const handlePrint = usePrint(componentRef);
    const { downloading, handler: handleDownload } = useDownload(
      componentRef,
      id,
      pdfOptions
    );
    const handleCustom = useReactToPrint({
      content: () => componentRef.current,
      ...customPrint,
    });

    return (
      <div ref={ref} {...props}>
        {trigger
          ? trigger({
              print: handlePrint,
              download: handleDownload,
              custom: handleCustom,
              downloading,
            })
          : undefined}
        {Array.isArray(children)
          ? children.map((child) =>
              React.cloneElement(child, { id, ref: componentRef })
            )
          : React.cloneElement(children, { id, ref: componentRef })}
      </div>
    );
  }
);

Printical.displayName = "Printical";

type UsePrinticalArgs = {
  pdfOptions?: PDFOptions;
  customPrint?: IReactToPrintProps;
};
const usePrintical = (args?: UsePrinticalArgs) => {
  const id = ID;
  const componentRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = usePrint(componentRef);
  const { downloading, handler: handleDownload } = useDownload(
    componentRef,
    id,
    args?.pdfOptions
  );

  const handleCustom = useReactToPrint({
    content: () => componentRef.current,
    ...args?.customPrint,
  });

  const Mini = React.forwardRef<
    HTMLDivElement,
    Omit<PrinticalProps, "customPrint" | "pdfOptions">
  >(({ children, trigger, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {trigger
          ? trigger({
              print: handlePrint,
              download: handleDownload,
              custom: handleCustom,
              downloading,
            })
          : undefined}
        {Array.isArray(children)
          ? children.map((child) =>
              React.cloneElement(child, { id, ref: componentRef })
            )
          : React.cloneElement(children, { id, ref: componentRef })}
      </div>
    );
  });
  Mini.displayName = "Mini";

  return {
    print: handlePrint,
    download: handleDownload,
    downloading,
    Printical: Mini,
  };
};

const generatePdf = async (node: HTMLElement, options?: PDFOptions) => {
  // @ts-ignore
  const html2pdf = await import("html2pdf.js");
  const worker = html2pdf.default();
  return await worker.set(options).from(node).save();
};

const usePrint = (ref: React.RefObject<HTMLDivElement>) =>
  useReactToPrint({
    content: () => ref.current,
  });
const useDownload = (
  ref: React.RefObject<HTMLDivElement>,
  id: string,
  opts?: PDFOptions
) => {
  const [downloading, setDownloading] = React.useState(false);

  const handler = useReactToPrint({
    content: () => ref.current,
    removeAfterPrint: true,
    onBeforePrint() {
      setDownloading(true);
    },
    onAfterPrint() {
      setDownloading(false);
    },
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      if (document) {
        const node = document.getElementById(id);

        if (!node) throw new Error("No node found with ID: " + id);

        await generatePdf(node, opts);
      }
    },
  });

  return {
    handler,
    downloading,
  };
};

export { Printical, usePrintical };
