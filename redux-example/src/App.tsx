import { Counters } from "./modules/counters/counters";
import { UsersList } from "./modules/users/users-list";

export function App() {
  return (
    <div className="container p-5 flex flex-col gap-5">
      <Counters />
      <UsersList />
    </div>
  );
}
