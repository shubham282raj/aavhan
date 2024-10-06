import { userProfile } from "../api-clients";
import { useQuery } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import TaskCard from "../components/TaskCard";
import { LoadingAnimation } from "../components/LoadingAnimations";

export default function Tasks({ marginTop = true }) {
  const { isLoggedIn, showToast } = useAppContext();

  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfile,
    enabled: isLoggedIn,
    onError(error) {
      showToast(error, "ERROR");
    },
  });

  if (!isLoggedIn) {
    return (
      <div className="bg-white flex flex-col gap-4 mx-auto py-10 px-20 rounded-2xl max-w-screen-md my-[100px]">
        You must login to access this page
      </div>
    );
  }

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="px-3">
      <div
        className={
          "xl:sticky xl:top-[70px] z-10 shadow-md block w-32 xl:w-full xl:max-w-screen-md bg-white mx-auto p-2 text-center text-xl m-auto mb-3 font-bold tracking-wide text-slate-800 rounded-xl " +
          (marginTop && "mt-20")
        }
      >
        Tasks
      </div>
      {user.taskList
        ?.slice(1)
        .reverse()
        .map((task, index) =>
          task[0] === "" ? (
            <div key={index}></div>
          ) : (
            <TaskCard
              key={index}
              taskCompleted={
                user.tasksCompleted && user.tasksCompleted[task[0]]
                  ? user.tasksCompleted[task[0]]
                  : []
              }
              task={task}
              headers={user.taskList[0]}
            />
          )
        )}
    </div>
  );
}
