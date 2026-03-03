import { OnboardingForm } from "@/components/onboarding-form";

export const metadata = {
  title: "Complete Your Profile — avax.exe",
  description:
    "Set up your gaming profile on avax.exe and join the Avalanche gaming community.",
};

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <OnboardingForm />
      </div>
    </main>
  );
}
