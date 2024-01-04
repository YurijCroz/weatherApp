import { useState } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
