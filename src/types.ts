type TriggerArgs = {
  print: () => void;
  download: () => void;
  downloading: boolean;
  custom: () => void;
};

/**
 * https://ekoopmans.github.io/html2pdf.js/
 */
export type PDFOptions = {
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
   * 	Configuration options sent directly to jsPDF (see here for usage)
   * https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html
   */
  jsPDF?: {
    orientation?: "portrait" | "landscape";
    unit?: "pt" | "mm" | "cm" | "in" | "px" | "pc" | "em" | "ex";
    format?:
      | "a0"
      | "a1"
      | "a2"
      | "a3"
      | "a4"
      | "a5"
      | "a6"
      | "a7"
      | "a8"
      | "a9"
      | "a10"
      | "b0"
      | "b1"
      | "b2"
      | "b3"
      | "b4"
      | "b5"
      | "b6"
      | "b7"
      | "b8"
      | "b9"
      | "b10"
      | "c0"
      | "c1"
      | "c2"
      | "c3"
      | "c4"
      | "c5"
      | "c6"
      | "c7"
      | "c8"
      | "c9"
      | "c10"
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
export type TriggerFunction = (args: TriggerArgs) => JSX.Element;
