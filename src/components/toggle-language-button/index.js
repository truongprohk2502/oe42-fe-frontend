import React, { useEffect, useState } from "react";
import "./style.sass";
import { useTranslation } from "react-i18next";

function ToggleLanguageButton(props) {
  const [language, setLanguage] = useState("vi");
  const { i18n } = useTranslation();

  useEffect(() => {
    setLanguage(localStorage.getItem("i18nextLng"));
  }, []);

  const handleChangeLanguage = () => {
    if (language === "vi") {
      i18n.changeLanguage("en");
      setLanguage("en");
    } else {
      i18n.changeLanguage("vi");
      setLanguage("vi");
    }
  };

  return (
    <div className="checkbox-item">
      <input
        type="checkbox"
        id="change-language"
        checked={language === "en"}
        onChange={handleChangeLanguage}
      />
      <label htmlFor="change-language">
        <span>en</span>
        <span>vi</span>
        <i className="fa fa-circle"></i>
      </label>
    </div>
  );
}

export default ToggleLanguageButton;
