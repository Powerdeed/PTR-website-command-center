import ForgotPasswordView from "./components/ForgotPasswordView";
import ForgotPasswordProvider from "./context/ForgotPasswordProvider";

export default function page() {
  return (
    <ForgotPasswordProvider>
      <ForgotPasswordView />
    </ForgotPasswordProvider>
  );
}
