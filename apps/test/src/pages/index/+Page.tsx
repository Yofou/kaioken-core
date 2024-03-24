import { PageTitle } from "$/components/PageTitle";
import { useEventListener } from "@kaioken-core/hooks";
import { useRef } from "kaioken";

export { Page };

function Page() {
  const ref = useRef<Element>(null);
  useEventListener(
    "click",
    () => {
      console.log("click");
    },
    {
      ref: () => document.querySelector('button')
    }
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      <PageTitle>Home</PageTitle>
      <button ref={ref}>Click me</button>
    </div>
  );
}
