import React from "react";
import { Activity, Zap, BarChart2, Settings } from "lucide-react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

interface FeatureCardProps {
  icon: React.ReactNode;
  titleId: string;
  descriptionId: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  titleId,
  descriptionId,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    {icon}
    <h3 className="text-xl font-semibold mt-4 mb-2">
      <FormattedMessage id={titleId} />
    </h3>
    <p className="text-gray-600">
      <FormattedMessage id={descriptionId} />
    </p>
  </div>
);

export default function AboutUs({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        <FormattedMessage id="about.title" />
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          <FormattedMessage id="about.mission.title" />
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          <FormattedMessage id="about.mission.description" />
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          <FormattedMessage id="about.whoWeServe.title" />
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li>
            <FormattedMessage id="about.whoWeServe.item1" />
          </li>
          <li>
            <FormattedMessage id="about.whoWeServe.item2" />
          </li>
          <li>
            <FormattedMessage id="about.whoWeServe.item3" />
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          <FormattedMessage id="about.features.title" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<Activity className="w-8 h-8 text-blue-500" />}
            titleId="about.features.gameplay.title"
            descriptionId="about.features.gameplay.description"
          />
          <FeatureCard
            icon={<Settings className="w-8 h-8 text-green-500" />}
            titleId="about.features.customizable.title"
            descriptionId="about.features.customizable.description"
          />
          <FeatureCard
            icon={<BarChart2 className="w-8 h-8 text-purple-500" />}
            titleId="about.features.tracking.title"
            descriptionId="about.features.tracking.description"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-yellow-500" />}
            titleId="about.features.engaging.title"
            descriptionId="about.features.engaging.description"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          <FormattedMessage id="about.whyChoose.title" />
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          <FormattedMessage id="about.whyChoose.description" />
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          <FormattedMessage id="about.joinMovement.title" />
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          <FormattedMessage id="about.joinMovement.description" />
        </p>
        <div className="text-center">
          <Link
            href={`/${lang}`}
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            <FormattedMessage id="about.getStarted" />
          </Link>
        </div>
      </section>
    </div>
  );
}
