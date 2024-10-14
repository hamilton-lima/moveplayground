import React from "react";
import { Activity, Zap, BarChart2, Settings } from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    {icon}
    <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        About MovePlayground
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          MovePlayground is revolutionizing physical therapy and fitness by
          combining body movements with engaging gameplay. We're on a mission to
          make exercise more enjoyable, help healthcare professionals motivate
          their patients, and provide effective tools for tracking
          rehabilitation progress.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Who We Serve</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li>
            Healthcare Institutions: Rehabilitation centers, physiotherapy
            clinics, hospitals, and wellness centers
          </li>
          <li>
            Therapists and Healthcare Professionals: Physical therapists,
            occupational therapists, and other healthcare providers
          </li>
          <li>
            Patients: Individuals in rehabilitation or those seeking an
            interactive way to stay fit
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Our Unique Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<Activity className="w-8 h-8 text-blue-500" />}
            title="Body-Controlled Gameplay"
            description="Access interactive games through standard web browsers, using just body movements - no expensive equipment required."
          />
          <FeatureCard
            icon={<Settings className="w-8 h-8 text-green-500" />}
            title="Customizable Experiences"
            description="Tailor games to meet specific therapeutic needs, personalizing each session for maximum effectiveness."
          />
          <FeatureCard
            icon={<BarChart2 className="w-8 h-8 text-purple-500" />}
            title="Progress Tracking"
            description="Easily track patient progress and export data for integration with existing reporting tools."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-yellow-500" />}
            title="Engaging Rehabilitation"
            description="Transform physical therapy into an enjoyable and motivating experience through gamification."
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Why Choose MovePlayground?
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          MovePlayground stands out by offering an accessible, customizable, and
          data-driven approach to physical therapy and fitness. Our platform
          bridges the gap between traditional rehabilitation methods and modern
          technology, creating a more engaging and effective experience for both
          patients and healthcare professionals.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Join the Movement</h2>
        <p className="text-lg text-gray-700 mb-4">
          Whether you're a healthcare institution looking to enhance your
          rehabilitation programs, a therapist seeking innovative tools to
          engage your patients, or an individual on a path to recovery or better
          fitness, MovePlayground is here to support your journey. Join us in
          revolutionizing the way we approach physical activity and
          rehabilitation.
        </p>
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            passHref
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
