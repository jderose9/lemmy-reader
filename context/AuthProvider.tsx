import { useRouter, useSegments } from "expo-router";
import { AuthContext } from "./AuthContext";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Account } from "@models/Account";
import { AuthService } from "@services/AuthService";

function useProtectedRoute(account: Account | null, storageLoaded: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "account";
    if(!storageLoaded)
      return;

    if (
      !account?.token &&
      !inAuthGroup
    ) {
      
      router.replace("/account");
    } else if (account && inAuthGroup) {
      router.replace("/");
    }
  }, [account, segments, storageLoaded]);
}

export function AuthProvider(props: PropsWithChildren) {
  const [storageLoaded, setStorageLoaded] = useState<boolean>(false);
  const [account, setAccount] = useState<Account | null>(null);
  const segments = useSegments();

  useEffect(() => {
    (async () => {
      const storedAccount = await AuthService.getCurrentAccountfromStorage();
      if(storedAccount) {
        setAccount(storedAccount);
      }
      setStorageLoaded(true);
    })();
  }, []);

  useProtectedRoute(account, storageLoaded);


  const value = useMemo(() => ({
    account,
    setAccount
  }), [account?.localId]);

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}