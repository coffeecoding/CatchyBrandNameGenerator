import { useRouter } from "next/router";

export default function Donate() {
  var router = useRouter();
  const { name } = router.query;
  if (router.isReady)
    router.replace("https://instantdomainsearch.com/?q=" + name);
}
