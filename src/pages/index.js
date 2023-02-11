import React from "react";
import Meta from "./../components/Meta";
import HeroSection from "./../components/HeroSection";
import FeaturesSection from "./../components/FeaturesSection";
import TestimonialsSection from "./../components/TestimonialsSection";
import NewsletterSection from "./../components/NewsletterSection";
import CtaSection from "./../components/CtaSection";
import BigLogo from "./../components/BigLogo"
import './../components/dashboard/Animation.css';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonGlow: {
    // animation: 'neon1 1.5s ease-in-out infinite alternate'
  }
  
}));


function IndexPage(props) {
  const classes = useStyles();

  return (
    <>
      <Meta />
      <HeroSection
        bgColor="default"
        size="large"
        bgImage="/option3.jpg"
        bgImageOpacity={0.3}
        title={<img height="150" src="/logo-tournament_trans_dark-960.png"/>}
        subtitle="Monetize your game with competitive Web3 leagues 🏆🥇🥈🥉 "
        buttonText="Start Earning 💵"
        buttonColor="secondary"
        buttonPath="/pricing"
        buttonClass={classes.buttonGlow}
      />
      <FeaturesSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Features"
        subtitle=""
      />
      {/* <ClientsSection
        bgColor="light"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="You're in good company"
        subtitle=""
      /> */}
      <TestimonialsSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Here's what people are saying"
        subtitle=""
      />
      <NewsletterSection
        bgColor="light"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Stay in the know"
        subtitle="Receive our latest articles and feature updates"
        buttonText="Subscribe"
        buttonColor="secondary"
        inputPlaceholder="Enter your email"
        subscribedMessage="You are now subscribed!"
      />
      <CtaSection
        bgColor="primary"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Ready to get started?"
        subtitle=""
        buttonText="Get Started"
        buttonColor="secondary"
        buttonPath="/pricing"
      />
    </>
  );
}

export default IndexPage;
