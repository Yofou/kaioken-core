import { PageTitle } from "$/components/PageTitle";
import { useElementBounding } from "@kaioken-core/hooks";
import { useRef } from "kaioken";

export { Page };

function Page() {
  const ref = useRef<Element>(null);
  const { width, height } = useElementBounding(ref)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <PageTitle>Home</PageTitle>
      <p>{width} - {height}</p>
      <textarea ref={ref}></textarea>
    </div>
  );
}
