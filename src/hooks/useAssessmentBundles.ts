import { useEffect, useState } from "react";
import { fetchAssessmentBundles } from "../api/mockAssessmentApi";
import { AssessmentBundle, RemoteData, RemoteDataHookResult } from "../types";

export function useAssessmentBundles(): RemoteDataHookResult<AssessmentBundle[]> {
  const [remoteData, setRemoteData] = useState<RemoteData<AssessmentBundle[]>>({ status: "idle" });

  const load = () => {
    setRemoteData({ status: "loading" });
    fetchAssessmentBundles()
      .then((data) => {
        setRemoteData({ status: "success", data });
      })
      .catch(() => {
        setRemoteData({ status: "error", error: "Unable to load assessment bundles" });
      });
  };

  useEffect(() => {
    load();
  }, []);

  return { remoteData, reload: load };
}
