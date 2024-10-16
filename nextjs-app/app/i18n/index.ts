import { createIntl } from "react-intl";
import { messages } from "./messages";

export const getIntl = (locale: string) => {
  return createIntl({
    locale: locale,
    messages: messages[locale as keyof typeof messages],
  });
};
