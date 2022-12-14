import { FC } from "react";

export interface IRoute {
  id: number;
  name: string;
  path: string;
  element: FC;
}
