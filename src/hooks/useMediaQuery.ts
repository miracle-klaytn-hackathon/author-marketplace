import { useState, useEffect } from "react";

export enum QUERY {
  MOBILE = "(max-width: 575.98px)",
  MOBILE_LARGE = "(max-width: 767.98px)",
  TABLETS = "(max-width: 991.98px)",
  DESKTOP_SMALL = "(max-width: 1023.99px)",
  DESKTOP = "(max-width: 1199.98px)",
  DESKTOP_LARGE = "(max-width: 1399.98px)",
}
const useMediaQuery = (query: QUERY): boolean => {
  const [match, setMatch] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    const handleChange = () => setMatch(media.matches);

    if ("addEventListener" in media) {
      media.addEventListener("change", handleChange);
      return () => {
        media.removeEventListener("change", handleChange);
      };
    } else {
      (media as MediaQueryList).addListener(handleChange);
      return () => {
        (media as MediaQueryList).removeListener(handleChange);
      };
    }
  }, [query]);

  return match;
};

export default useMediaQuery;
