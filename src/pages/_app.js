import React from "react";
import Navbar from "./../components/Navbar";
import IndexPage from "./index";
import AboutPage from "./about";
import FaqPage from "./faq";
import ContactPage from "./contact";
import PricingPage from "./pricing";
import OverviewPage from "./overview";
import AuthPage from "./auth";
import SettingsPage from "./settings";
import LegalPage from "./legal";
import CommunityPage from "./community";
import TraderPage from "./trader";
import { Switch, Route, Router } from "./../util/router";
import PurchasePage from "./purchase";
import DiscussionPage from "./../components/DiscussionPage";
import NotFoundPage from "./404";
import Footer from "./../components/Footer";
import Leaderboard from "./../components/dashboard/paperbase/Leaderboard";
import "./../util/analytics";
import Chat from "./../components/Chat";
import { AuthProvider } from "./../util/auth";
import { ThemeProvider } from "./../util/theme";
import { QueryClientProvider } from "./../util/db";

function App(props) {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <AuthProvider>
          <Chat />
          <Router>
            <>
              <Navbar
                color="default"
                logo="/logo-tournament_trans-dark.png"
                logoInverted="/logo-tournament_trans-dark.png"
              />

              <Switch>
                <Route exact path="/" component={IndexPage} />

                <Route exact path="/about" component={AboutPage} />

                <Route exact path="/faq" component={FaqPage} />

                <Route exact path="/contact" component={ContactPage} />

                <Route exact path="/pricing" component={PricingPage} />


                <Route exact path="/overview" render={() => <OverviewPage content={<Leaderboard/>}/>} />

                <Route exact path="/traders" component={OverviewPage} />
                <Route path="/traders/:id" render={() => <OverviewPage content={<TraderPage/>}/>} />
                <Route exact path="/community" render={() => <OverviewPage content={<CommunityPage/>}/>} />
                <Route path="/community/:id" render={() => <OverviewPage content={<DiscussionPage/>}/>} />

                <Route exact path="/auth/:type" component={AuthPage} />

                <Route
                  exact
                  path="/settings/:section"
                  component={SettingsPage}
                />

                <Route exact path="/legal/:section" component={LegalPage} />

                <Route exact path="/purchase/:plan" component={PurchasePage} />

                <Route component={NotFoundPage} />
              </Switch>

              <Footer
                bgColor="default"
                size="medium"
                bgImage=""
                bgImageOpacity={1}
                description=""
                copyright={`© ${new Date().getFullYear()} Company`}
                logo="/logo-tournament_trans-dark.png"
                logoInverted="/logo-tournament_trans-dark.png"
                sticky={true}
              />
            </>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
