import { useQuery } from "react-query";
import { LoadingAnimation } from "../components/LoadingAnimations";
import { getLeaderboard } from "../api-clients";
import { useAppContext } from "../contexts/AppContext";

export default function Leaderboard() {
  const { showToast } = useAppContext();

  const { data: leaderboard = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
    onError(error) {
      showToast(error, "ERROR");
    },
    onSuccess(data) {
      data.sort((a, b) => b.points - a.points);
    },
    staleTime: 0,
    cacheTime: 0,
  });

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="m-auto flex flex-col gap-2 my-2 max-w-screen-md">
      {leaderboard.map((user, index) => (
        <div key={user._id + "leaderboard"} className="bg-white rounded-lg p-5">
          <span className="w-6 pr-2 inline-block">{index + 1}.</span>
          <span className="inline-flex gap-5">
            <span>{user.name}</span>
            <span>{user.college}</span>
            <span>{user.points} points</span>
          </span>
        </div>
      ))}
    </div>
  );
}
