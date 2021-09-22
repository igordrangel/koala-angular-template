import { BehaviorSubject } from "rxjs";

export interface LoaderConfigInterface {
  progress?: BehaviorSubject<number>;
  dismiss: BehaviorSubject<boolean>;
  typeLoader: "buffer" | "determinate" | "query" | "indeterminate",
  message: string;
}
