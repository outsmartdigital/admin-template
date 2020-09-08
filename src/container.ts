import { ContainerInstance } from "typedi";
import { Config, getConfig } from "./config";
import { getGlobalService, GlobalService } from "./global/GlobalService";

export const setupContainer = (container: ContainerInstance) => {
  container.set(Config, getConfig());
  container.set(GlobalService, getGlobalService(container));
  container.set("test", true);
};
