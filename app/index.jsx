// app/index.jsx
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

export default function Index() {
  const userLogin = useSelector((state) => state.expense.userLogin);

  if (userLogin) {
    return <Redirect href="/(tab)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
