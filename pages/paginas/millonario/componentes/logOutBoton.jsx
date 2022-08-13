import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from 'next/router'

 const LogoutButton = () => {
  const { logout } = useAuth0();
  const router = useRouter();
  const url = router.basePath !== '/' && router.basePath !== '' && router.basePath !== ' '? router.basePath : 'https://super-app-liard.vercel.app/paginas/millonario'
 
  return (
    <button onClick={() => logout({ returnTo: url })}>
      Logout
    </button>
  );
};
export default LogoutButton