import { useMediaQuery } from "@mui/material";

const useBreakpoints = () => {
  const isXs = useMediaQuery("(max-width: 600px)");
  const isSm = useMediaQuery("(max-width: 960px)");
  const isMd = useMediaQuery("(max-width: 1280px)");
  const isLg = useMediaQuery("(max-width: 1920px)");

  return {
    isXs,
    isSm,
    isMd,
    isLg,
  };
};

export default useBreakpoints;
