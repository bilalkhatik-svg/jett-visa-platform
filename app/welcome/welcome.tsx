import { Button, Card, Input } from "~/design-system/ui";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  return (
    <div className="bg-red-500">
      <Card>
        <h2 className="text-h4 mb-4">Buttons</h2>
        <div className="flex gap-2">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </Card>

      <h2 className="text-h4 font-medium mb-4">Apply Visa</h2>
    </div>
  );
}


