import { useQuery, QueryKey} from '@tanstack/react-query';

type TuseApiQueryProps<TResponse> = {
  keys : QueryKey, 
  func :()=> Promise<TResponse>, 
  enabled?:  boolean
}
 const useApiQuery = <TResponse=unknown,E = Error> ({keys, func, enabled = true,} :TuseApiQueryProps<TResponse>) => {
  return useQuery<TResponse,E>({
    queryKey: Array.isArray(keys) ? keys : [keys],
    queryFn: () => func(),
    enabled: enabled,
  });
};

export default useApiQuery;