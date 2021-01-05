import React, { useContext, useState } from "react";
import { Container, ContainerInstance } from "typedi";

export const ContainerContext = React.createContext<ContainerInstance>(
  Container.of("default")
);

export const useContainer = () => {
  return useContext(ContainerContext);
};

export const useService = <T>(service: { new (): T }) => {
  const container = useContainer();
  const [serviceFromContainer] = useState(() => container.get(service));
  return serviceFromContainer as T;
};
