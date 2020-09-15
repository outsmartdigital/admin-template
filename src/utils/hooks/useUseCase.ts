import { BaseUseCase } from "../architecture/BaseUseCase";
import { useContainer } from "../architecture/di/containerContext";
import { useState } from "react";
import { usePromise } from "./usePromise";

export const useUseCase = <
  UC extends BaseUseCase<
    Input extends void ? void : Input,
    Output extends void ? void : Input
  >,
  Input,
  Output
>(
  useCase: { new (): UC },
  config?: Parameters<typeof usePromise>[2]
) => {
  const container = useContainer();
  const [useCaseInstance] = useState(() => container.get(useCase));
  return usePromise(
    useCaseInstance.execute.bind(useCaseInstance) as UC["execute"],
    undefined,
    config
  );
};
