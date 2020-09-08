import React, { useContext } from "react";
import { Container, ContainerInstance } from "typedi";

export const ContainerContext = React.createContext<ContainerInstance>(
  Container.of("default")
);

export const useContainer = () => {
  return useContext(ContainerContext);
};
