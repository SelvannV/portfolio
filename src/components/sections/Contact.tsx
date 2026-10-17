import { SectionLayout } from "./SectionLayout";

export function Contact() {
  return (
    <SectionLayout
      id="contact"
      label="04 — Contact"
      scrollScreens={0}
      endText="The end."
      end="Back to top ↑"
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        {/* Contact content */}
      </div>
    </SectionLayout>
  );
}
