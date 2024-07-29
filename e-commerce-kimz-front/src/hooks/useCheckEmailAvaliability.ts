import request from "@services/request";
import { useState } from "react";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmailAvaliability = () => {
const [emailAvaliabilityStatus, setemailAvaliabilityStatus] = useState<TStatus>("idle");
const [enterdEmail, setEnterdEmail] = useState<null | string>(null);

const checkEmailAvaliability = async(email :string) => {
  setEnterdEmail(email);
  setemailAvaliabilityStatus("checking");
  try {
    const response = await request.get(`/users?email=${email}`);

    if (!response.data.length) {
setemailAvaliabilityStatus("available");
    } else {
      setemailAvaliabilityStatus("notAvailable");
    }
  } catch (error) {
    setemailAvaliabilityStatus("failed");
  }
}

const resetCheckEmailAvaliability = () => {
  setEnterdEmail(null);
  setemailAvaliabilityStatus("idle");
}

return {emailAvaliabilityStatus , enterdEmail , checkEmailAvaliability , resetCheckEmailAvaliability}

};

export default useCheckEmailAvaliability;
