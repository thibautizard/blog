import InformationBanner from "@/markdown/-components/information-banner";
export function SelectFallback({ children }: { children: React.ReactNode }) {
  return (
    <InformationBanner status="warning">
      <p>
        Votre navigateur ne supporte pas actuellement cette fonctionnalité 🥲 Je
        vous conseille{" "}
        <span className="font-semibold">
          de basculer sur Chrome ou Edge en version desktop
        </span>{" "}
        pour profiter de sa version interactive !
      </p>
      {children}
    </InformationBanner>
  );
}
