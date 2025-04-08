import { Header } from "../components/header";
import { Game } from "../components/gameNew";
import { UiTextField } from "../components/uikit/uiTextField";

export default function HomePage() {
  return (
    <HomePageLayout header={<Header />}>
      <UiTextField
        label="Label"
        placeholder="Placeholder"
        required
        helperText="Helper text"
        errorText="Error text"
      />
    </HomePageLayout>
  );
}

function HomePageLayout({ header, children }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      {header}
      <main className="mt-6 mx-auto w-max">{children}</main>
    </div>
  );
}
