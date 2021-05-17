import React from "react";
import "./style.sass";
import { useTranslation } from "react-i18next";

function Footer(props) {
  const { t } = useTranslation();

  return (
    <footer>
      <img
        src="http://www.lottecinemavn.com/LCHS/Image/logo_footer.gif?v=17111301"
        alt="lotte cinema"
      />
      <div className="info-item company-name">
        {t("footer.company")}
      </div>
      <div className="info-item">
        {t("footer.address_name")}: {t("footer.address_value")}
      </div>
      <div className="info-item">{t("footer.hotline")}: (028) 3775 2524</div>
      <div className="info-item copyright">
        {t("footer.copyright_name")} © LOTTECINEMAVN.COM - 
        {t("footer.copyright_value")}.
      </div>
    </footer>
  );
}

export default Footer;
