import React from "react";
import Meta from "./../components/Meta";
import FaqSection from "./../components/FaqSection";
import CtaSection from "./../components/CtaSection";

function FaqPage() {
  return (
    <>
      <Meta title="Faq" />
      <FaqSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Frequently Asked Questions"
        subtitle=""
      />
      <CtaSection
        bgColor="secondary"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Ready to get started?"
        subtitle=""
        buttonText="Get Started"
        buttonColor="primary"
        buttonPath="/pricing"
      />
    </>
  );
}

export default FaqPage;
