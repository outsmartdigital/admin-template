import { useCallback } from "react";

import { useLegacyState } from "./useLegacyState";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export const usePromise = <
  FunctionType extends (...any: any[]) => Promise<any>
>(
  promiseGen: FunctionType,
  deps: any[] = [],
  config?: {
    loadingImmediately?: boolean;
    onSuccess?: (data: ThenArg<ReturnType<FunctionType>>) => void;
    onError?: (err: Error) => void;
  }
) => {
  const loadedConfig = {
    ...{
      loadingImmediately: undefined
    },
    ...(config || {})
  };
  const [state, setState] = useLegacyState({
    loading: loadedConfig.loadingImmediately,
    error: undefined,
    data: undefined as ThenArg<ReturnType<FunctionType>> | undefined
  });
  const doRequest: (...params: Parameters<FunctionType>) => void = useCallback(
    (...args: Parameters<FunctionType>) => {
      setState({ loading: true });
      promiseGen(...args)
        .then(res => {
          setState({ loading: false, data: res });
          loadedConfig?.onSuccess?.(res);
        })
        .catch(e => {
          console.warn("Error at usePromise", e);
          setState({ loading: false, error: e });
          loadedConfig?.onError?.(e);
        });
    },
    [loadedConfig, promiseGen, setState]
  );
  return {
    request: doRequest,
    loading: state.loading,
    error: state.error,
    data: state.data
  };
};
