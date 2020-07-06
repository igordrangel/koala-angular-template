export interface LoaderBarPageInterface {
  show: boolean;
  progress: number;
  typeLoader: "buffer" | "determinate" | "query" | "indeterminate";
}
