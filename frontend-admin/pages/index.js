import { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/statistical");
  }, []);
}

export default Home;
