import { useRouteMatch, matchPath } from "react-router";

export default function useCustomParams(path) {
  const { url } = useRouteMatch();
  const match = matchPath(url, {
    path,
    exact: true,
    strict: false,
  });
  return match?.params || {};
}
