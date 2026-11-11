"use client";

import { useCallback, useEffect, useState } from "react";

export function useRemoteData(load, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setData(await load());
    } catch (requestError) {
      setError(requestError.message || "No fue posible cargar la información.");
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh, setData };
}
