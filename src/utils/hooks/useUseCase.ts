import { BaseUseCase } from "../architecture/BaseUseCase";
import { useContainer } from "../architecture/di/containerContext";
import { useState } from "react";
import { usePromise } from "./usePromise";

export const useUseCase = <
  UC extends BaseUseCase<Input, Output>,
  Input = any,
  Output = any
>(useCase: {
  new (): UC;
}) => {
  const container = useContainer();
  const [useCaseInstance] = useState(() => container.get(useCase));
  return usePromise(useCaseInstance.execute.bind(useCaseInstance));
};
