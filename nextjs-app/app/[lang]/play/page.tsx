"use client";

import { FormattedMessage } from "react-intl";

export default function Play({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <h1>
      <FormattedMessage id="play.title" />
    </h1>
  );
}
