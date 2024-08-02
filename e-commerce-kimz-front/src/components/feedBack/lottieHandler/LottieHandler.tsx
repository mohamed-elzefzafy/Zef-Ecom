import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/not-found.json";
import empty from "@assets/lottieFiles/empty.json";
import loading from "@assets/lottieFiles/loading.json";
import error from "@assets/lottieFiles/error.json";
import success from "@assets/lottieFiles/success.json";

const lottieFilesMap = {
  notFound,
  empty,
  loading,
  error,
  success,
};

type TProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
};
const LottieHandler = ({ type, message }: TProps) => {
  const lootieStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px", color: "#0dcaf0" };
  return (
    <div className="d-flex  flex-column align-items-center">
      <Lottie
        animationData={lottieFilesMap[type]}
        style={{ width: "400px", marginBottom: "20px" }}
      />
      {message && (
        <h3 className="fs-3" style={lootieStyle}>
          {message}
        </h3>
      )}
    </div>
  );
};

export default LottieHandler;
