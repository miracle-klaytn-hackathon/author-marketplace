/* APP
   ========================================================================== */

import "assets/styles/reset.css";
import "assets/styles/global.css";
import "services/i18n";
import "react-toastify/dist/ReactToastify.css";
import "react-day-picker/dist/style.css";

import { BrowserRouter, useRoutes } from "react-router-dom";
import store, { Provider } from "store";

import ErrorBoundary from "containers/error-boundary/error-boundary";
import { ThemesProvider } from "services/styled-themes";
import { reload } from "utils/functions";
import routes from "routes";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import Web3Provider from "./web3/Web3Provider";

import 'assets/styles/bases/_index.scss'
import 'assets/styles/utils/_index.scss'

/**
 * Entry point for route component
 * @returns JSX Element represents for route components
 */
const Main = () => {
  const element = useRoutes(routes);
  return element;
};

/**
 * Entry point for App
 * @returns JSX Element represents for app
 */
const App = () => {
  return (
    <ErrorBoundary onReset={reload}>
      <BrowserRouter>
        <ThemesProvider>
          <Web3Provider>
            <Provider store={store}>
              <Suspense fallback={<>Loading</>}>
                <Main />
              </Suspense>
              <ToastContainer
                // position="top-center"
                theme="colored"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                closeButton={false}
                // icon={renderIcon}
              />
            </Provider>
          </Web3Provider>
        </ThemesProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
