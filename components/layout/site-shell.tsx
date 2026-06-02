import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProfileSetupBanner } from "@/components/layout/profile-setup-banner";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ProfileSetupBanner />
      <main className="pb-10">{children}</main>
      <Footer />
    </div>
  );
}
