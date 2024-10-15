import { FormattedMessage } from "react-intl";

export default function Login({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <h1>
      <FormattedMessage id="login.title" />
    </h1>
  );
}
