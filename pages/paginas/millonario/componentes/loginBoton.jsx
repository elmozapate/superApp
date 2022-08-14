import { useAuth0 } from "@auth0/auth0-react";
import { EnvM } from "../../../../envMachetero";
const envM=EnvM()

const LoginButton = () => {
    const url =`${envM.hostFront}paginas/millonario`

    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect(url)}>Login</button>;
};
export default LoginButton