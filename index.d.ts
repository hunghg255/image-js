// Type definitions for image-js
// Project: https://github.com/image-js/image-js
// Definitions by: Michaël Zasso <https://github.com/targos>

import Matrix from 'ml-matrix';

// Global variable exposed by UMD bundle
export as namespace IJS;

export declare class Image {
  width: number;
  height: number;
  data: DataArray;
  size: number;
  components: number;
  alpha: BinaryValue;
  bitDepth: BitDepth;
  maxValue: number;
  colorModel: ColorModel;
  channels: number;
  meta: object;

  constructor(
    width: number,
    height: number,
    data: ArrayLike<number>,
    options?: ImageConstructorOptions,
  );
  constructor(width: number, height: number, options?: ImageConstructorOptions);
  constructor(options?: ImageConstructorOptions);

  static isImage(object: any): boolean;
  static fromCanvas(canvas: HTMLCanvasElement): Image;
  static createFrom(other: Image, options: ImageConstructorOptions): Image;
  static load(
    image: string | ArrayBuffer | Uint8Array,
    options?: RequestInit & { ignorePalette: boolean },
  ): Promise<Image>;

  getRoiManager(): RoiManager;
  clone(): Image;

  // valueMethods
  getValueXY(x: number, y: number, channel: number): number;
  setValueXY(x: number, y: number, channel: number, value: number): this;
  getValue(index: number, channel: number): number;
  setValue(index: number, channel: number, value: number): this;
  getPixelXY(x: number, y: number): Array<number>;
  setPixelXY(x: number, y: number, value: Array<number>): this;
  getPixel(index: number): Array<number>;
  setPixel(index: number, value: Array<number>): this;

  // bitMethods
  getBit(index: number): BinaryValue;
  setBit(index: number): void;
  clearBit(index: number): void;
  toggleBit(index: number): void;
  getBitXY(x: number, y: number): BinaryValue;
  setBitXY(x: number, y: number): void;
  clearBitXY(x: number, y: number): void;
  toggleBitXY(x: number, y: number): void;

  // exportMethods
  save(path: string, options?: SaveOptions): Promise<void>;
  toDataURL(type?: string, options?: SaveOptions): string;
  toBase64(type?: string, options?: SaveOptions): string | Promise<string>;
  toBuffer(options?: SaveOptions): Uint8Array;
  toBlob(type?: string, quality?: number): Promise<Blob>;
  getCanvas(): HTMLCanvasElement;

  checkProcessable(processName: string, options: object): void;
  getRGBAData(options?: { clamped?: boolean }): Uint8Array | Uint8ClampedArray;

  // extend
  invert(options?: OutOrInplace): Image;
  abs(options?: OutOrInplace): Image;
  level(options?: {
    channels?: SelectedChannels;
    min?: number;
    max?: number;
  }): this;
  add(
    value: Array<number> | Image | number,
    options?: { channels?: Array<Channel> },
  ): this;
  subtract(
    value: Array<number> | Image | number,
    options?: { channels?: Array<Channel> },
  ): this;
  subtractImage(
    otherImage: Image,
    options?: { channels?: Array<Channel>; absolute?: boolean },
  ): this;
  multiply(
    value: Array<number> | Image | number,
    options?: { channels?: Array<Channel> },
  ): this;
  divide(
    value: Array<number> | Image | number,
    options?: { channels?: Array<Channel> },
  ): this;
  hypotenuse(
    otherImage: Image,
    options?: { bitDepth?: number; channels?: Array<Channel> },
  ): Image;
  // background
  flipX(): this;
  flipY(): this;

  blurFilter(options?: { radius?: number }): Image;
  medianFilter(options?: {
    radius?: number;
    border?: BorderHandling;
    channels?: SelectedChannels;
  }): Image;
  gaussianFilter(options?: GaussianFilterOptions): Image;
  gradientFilter(options?: GradientFilterOptions): Image;
  sobelFilter(options?: GradientOptions): Image;
  scharrFilter(options?: GradientOptions): Image;

  dilate(options?: MorphologicalOptions): Image;
  erode(options?: MorphologicalOptions): Image;
  open(options?: MorphologicalOptions): Image;
  close(options?: MorphologicalOptions): Image;
  topHat(options?: MorphologicalOptions): Image;
  blackHat(options?: MorphologicalOptions): Image;
  morphologicalGradient(options?: MorphologicalOptions): Image;

  warpingFourPoints(
    pts: Array<Array<number>>,
    options?: {
      calculateRatio?: boolean;
    },
  ): Image;
  crop(options?: CropOptions): Image;
  cropAlpha(options?: { threshold?: number }): Image;
  resize(options?: ResizeOptions): Image;
  hsv(): Image;
  hsl(): Image;
  cmyk(): Image;
  rgba8(): Image;
  grey(options?: GreyOptions): Image;
  mask(options?: MaskOptions): Image;
  pad(options?: {
    size?: number;
    algorithm?: 'set' | 'copy';
    color?: Array<number>;
  }): Image;
  colorDepth(newColorDepth: 8 | 16): Image;
  setBorder(options?: {
    size?: number;
    algorithm?: 'set' | 'copy';
    color?: Array<number>;
  }): Image;
  rotate(angle: number, options?: RotateOptions): Image;
  rotateLeft(): Image;
  rotateRight(): Image;

  getRow(row: number, channel?: number): Array<number>;
  getColumn(row: number, channel?: number): Array<number>;
  getMatrix(options?: { channel?: number }): Matrix;
  setMatrix(matrix: Matrix, options?: { channel?: number });
  getPixelsArray(): Array<Array<number>>;
  getIntersection(mask2: Image): object;
  getClosestCommonParent(mask: Image): Image;
  getThreshold(options?: { algorithm?: ThresholdAlgorithm }): number;

  split(options?: { preserveAlpha?: boolean }): Stack;
  getChannel(
    channel: Channel,
    options?: { keepAlpha?: boolean; mergeAlpha?: boolean },
  ): Image;
  combineChannels(
    method?: Function,
    options?: { keepAlpha?: boolean; mergeAlpha?: boolean },
  ): Image;
  setChannel(channel: any, image: Image): this;
  getSimilarity(
    image: Image,
    options?: {
      shift?: Array<number>;
      average?: boolean;
      channels?: Array<Channel>;
      defaultAlpha?: boolean;
      normalize?: boolean;
      border?: Array<number>;
    },
  ): Array<number> | number;
  getPixelsGrid(options?: {
    sampling?: Array<number>;
    painted?: boolean;
    mask?: Image;
  }): { xyS: Array<number>; zS: Array<number>; painted: Image };
  getBestMatch(
    image: Image,
    options?: { border?: Array<number> },
  ): Array<number>;

  // cannyEdge
  convolution(kernel: Kernel, options?: ConvolutionOptions): Image;
  extract(
    mask: Image,
    options?: {
      position?: Array<number>;
    },
  ): this;
  // floodFill
  paintLabels(
    labels: Array<string>,
    positions: Array<Array<number>>,
    options?: {
      color?: Array<number> | string;
      colors?: Array<Array<number>> | Array<string>;
      font?: string | Array<string>;
      rotate?: number | Array<number>;
    },
  ): this;
  paintMasks(
    masks: Image | Array<Image>,
    options?: {
      color?: Array<number> | string;
      colors?: Array<Array<number>> | Array<string>;
      randomColors?: boolean;
      distinctColors?: boolean;
      alpha?: number;
      labels?: Array<string>;
      labelsPosition?: Array<Array<number>>;
      labelColor?: string;
      labelFont?: string;
    },
  ): this;
  paintPoints(
    points: Array<Array<number>>,
    options?: {
      color?: Array<number> | string;
      colors?: Array<Array<number>> | Array<string>;
      randomColors?: boolean;
      distinctColors?: boolean;
      shape?: object;
    },
  ): this;
  paintPolyline(
    points: Array<Array<number>>,
    options?: {
      color?: Array<number>;
      closed?: boolean;
    },
  ): this;
  paintPolylines(
    polylines: Array<Array<Array<number>>>,
    options?: {
      color?: Array<number> | string;
      colors?: Array<Array<number>> | Array<string>;
      randomColors?: boolean;
      distinctColors?: boolean;
      shape?: object;
    },
  ): this;
  paintPolygon(
    points: Array<Array<number>>,
    options?: {
      color?: Array<number>;
      filled?: boolean;
    },
  ): this;
  paintPolygons(
    points: Array<Array<Array<number>>>,
    options?: {
      color?: Array<number> | string;
      colors?: Array<Array<number>> | Array<string>;
      randomColors?: boolean;
      distinctColors?: boolean;
      shape?: object;
    },
  ): this;

  countAlphaPixels(options?: { alpha?: number }): number;
  monotoneChainConvexHull(): Array<Array<number>>;
  minimalBoundingRectangle(options?: {
    originalPoints?: Array<Array<number>>;
  }): Array<Array<number>>;
  getHistogram(options?: {
    maxSlots?: number;
    channel?: number;
    useAlpha?: boolean;
  }): Array<number>;
  getHistograms(options?: { maxSlots?: number }): Array<Array<number>>;
  getColorHistogram(options?: {
    useAlpha?: boolean;
    nbSlots?: number;
  }): Array<number>;
  getMin(): Array<number>;
  getMax(): Array<number>;
  getSum(): Array<number>;
  getMoment(xPower: number, yPower: number): number;
  getLocalMaxima(options?: {
    mask?: Image;
    region?: number;
    removeClosePoints?: number;
    invert?: boolean;
    maxEquals?: number;
  }): Array<number>;
  getMedian(): Array<number>;
  getMean(): Array<number>;
  getPoints(): Array<Array<number>>;
  getRelativePosition(
    targetImage: Image,
    options?: {
      defaultFurther?: boolean;
    },
  ): Array<number> | boolean;
}

export declare class Stack extends Array<Image> {
  static load: (files: string[]) => Stack;

  constructor();
  constructor(images: Image[]);

  getAverageImage(): Image;
  // histogram
  // histograms
  // matchAndCrop
  // max
  getMaxImage(): Image;
  // median
  // min
  getMinImage(): Image;
}

export declare class RoiManager {}

export interface ImageConstructorOptions {
  width?: number;
  height?: number;
  data?: ArrayLike<number>;
  kind?: ImageKind;
  bitDepth?: BitDepth;
  components?: number;
  alpha?: 0 | 1;
  colorModel?: ColorModel;
}

export interface SaveOptions {
  format?: string;
  useCanvas?: boolean;
  encoder?: object;
}

export interface OutOrInplace {
  inPlace?: boolean;
  out?: Image;
}

export interface MorphologicalOptions {
  kernel?: BinaryKernel;
  iterations?: number;
}

export interface GaussianFilterOptions {
  radius?: number;
  sigma?: number;
  channels?: SelectedChannels;
  border?: BorderHandling;
  algorithm?: ConvolutionAlgorithm;
}

export interface ConvolutionOptions {
  channels?: SelectedChannels;
  bitDepth?: BitDepth;
  normalize?: boolean;
  divisor?: number;
  border?: BorderHandling;
  algorithm?: ConvolutionAlgorithm;
}

export interface GradientOptions {
  direction?: GradientDirection;
  border?: BorderHandling;
  channels?: SelectedChannels;
  bitDepth?: BitDepth;
}

export interface GradientFilterOptions extends GradientOptions {
  kernelX?: Kernel;
  kernelY?: Kernel;
}

export declare enum ImageKind {
  BINARY = 'BINARY',
  GREY = 'GREY',
  GREYA = 'GREYA',
  RGB = 'RGB',
  RGBA = 'RGBA',
  CMYK = 'CMYK',
  CMYKA = 'CMYKA',
}

export declare enum BitDepth {
  BINARY = 1,
  UINT8 = 8,
  UINT16 = 16,
  FLOAT32 = 32,
}

export declare enum ColorModel {
  GREY = 'GREY',
  RGB = 'RGB',
  HSL = 'HSL',
  HSV = 'HSV',
  CMYK = 'CMYK',
}

export declare enum BorderHandling {
  COPY = 'copy',
}

export declare enum ConvolutionAlgorithm {
  AUTO = 'auto',
  DIRECT = 'direct',
  FFT = 'fft',
  SEPARABLE = 'separable',
}

export interface CropOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface ResizeOptions {
  width?: number;
  height?: number;
  factor?: number;
  interpolation?: 'nearestNeighbor';
  preserveAspectRatio?: boolean;
}

export interface GreyOptions {
  algorithm?: GreyAlgorithm | GreyAlgorithmCallback;
  keepAlpha?: boolean;
  mergeAlpha?: boolean;
  out?: Image;
}

export declare enum GreyAlgorithm {
  LUMA709 = 'luma709',
  LUMA601 = 'luma601',
  MAXIMUM = 'maximum',
  MINIMUM = 'minimum',
  AVERAGE = 'average',
  MINMAX = 'minmax',
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  CYAN = 'cyan',
  MAGENTA = 'magenta',
  YELLOW = 'yellow',
  BLACK = 'black',
  HUE = 'hue',
  SATURATION = 'saturation',
  LIGHTNESS = 'lightness',
}

export type GreyAlgorithmCallback = (
  red: number,
  green: number,
  blue: number,
) => number;

export interface MaskOptions {
  algorithm?: ThresholdAlgorithm | 'threshold';
  threshold?: number;
  useAlpha?: boolean;
  invert?: boolean;
}

export declare enum ThresholdAlgorithm {
  HUANG = 'huang',
  INTERMODES = 'intermodes',
  ISODATA = 'isodata',
  LI = 'li',
  MAX_ENTROPY = 'maxentropy',
  MEAN = 'mean',
  MIN_ERROR = 'minerror',
  MOMENTS = 'moments',
  OTSU = 'otsu',
  PERCENTILE = 'percentile',
  RENYI_ENTROPY = 'renyientropy',
  SHANBHAG = 'shanbhag',
  TRIANGLE = 'triangle',
  YEN = 'yen',
}

export interface RotateOptions {
  interpolation?: InterpolationAlgorithm;
}

export declare enum GradientDirection {
  WIDTH = 'x',
  HEIGHT = 'y',
  BOTH = 'xy',
}

export declare enum InterpolationAlgorithm {
  NEAREST_NEIGHBOR = 'nearestNeighbor',
  BILINEAR = 'bilinear',
}

export type DataArray = Uint8Array | Uint16Array | Float32Array;
export type BinaryValue = 0 | 1;
export type SelectedChannels = number | string | Array<number> | Array<string>;
export type BinaryKernel = Array<Array<BinaryValue>>;
export type Kernel = Array<Array<number>>;
export type Channel = number | string;

export default Image;
