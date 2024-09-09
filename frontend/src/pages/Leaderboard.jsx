import { useQuery } from "react-query";
import { LoadingAnimation } from "../components/LoadingAnimations";
import { getLeaderboard } from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import ScrollTranslateComponent from "../components/OnScroll";

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
    <div className="my-[60px] sm:my-[80px] px-3 max-w-screen-md m-auto overflow-hidden pb-2">
      <div className="text-3xl sm:text-4xl text-center font-bold py-3 text-slate-800">
        LEADERBOARD
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {leaderboard.map((user, index) => {
          return (
            <ScrollTranslateComponent
              key={user._id + "leaderboard"}
              className={
                "bg-black bg-opacity-5 shadow-sm shadow-slate-700 rounded-lg p-5 flex-1 min-w-full flex " +
                (index < 3 &&
                  " min-w-full sm:min-w-[32%] sm:flex-col gap-5 sm:gap-3 ")
              }
              from="translateX(80%)"
              to="translateX(0px)"
              time="0.3s"
              opacity={true}
              delay={(index * 0.2 < 0.5 ? index * 0.2 : 0.5) + "s"}
              element={
                <>
                  {index < 3 ? (
                    <div className="h-20 aspect-square relative sm:m-auto overflow">
                      <div
                        className={
                          "w-[90%] aspect-square border rounded-full absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
                        }
                        style={{
                          background:
                            index == 0
                              ? "linear-gradient(to top, #d38e24, #fcef86)"
                              : index == 1
                              ? "linear-gradient(to top, #acaaaa, #ececec)"
                              : "linear-gradient(to top, #e7743b, #f8d59e)",
                        }}
                      >
                        <div className="text-3xl font-bold text-black opacity-50">
                          {index + 1}
                        </div>
                      </div>
                      <div
                        className="w-full shadow-slate-600 shadow-md aspect-square border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10"
                        style={{
                          background:
                            index == 0
                              ? "linear-gradient(to bottom, #d38e24, #fcef86)"
                              : index == 1
                              ? "linear-gradient(to bottom, #acaaaa, #ececec)"
                              : "linear-gradient(to bottom, #e7743b, #f8d59e)",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div className="w-6 pr-2 inline-block">{index + 1}.</div>
                  )}
                  <div
                    className={
                      "flex w-full justify-between gap-1 " +
                      (index < 3 && " flex-col sm:items-center w-auto")
                    }
                  >
                    <div className={index < 3 ? "font-bold" : "font-semibold"}>
                      {user.name}
                    </div>
                    <div>{user.college}</div>
                    <div>{user.points} points</div>
                  </div>
                </>
              }
            />
          );
        })}
      </div>
    </div>
  );
}
