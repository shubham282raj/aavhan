import { userProfile } from "../api-clients";
import { useQuery } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import TaskCard from "../components/TaskCard";
import { LoadingAnimation } from "../components/LoadingAnimations";
import { useState } from "react";

function DoubtTab({ open, setOpen }) {
  return (
    <div
      className="fixed px-20 border w-[90vw] max-w-screen-sm min-h-[50vh] left-1/2 top-1/2 rounded-lg bg-gray-200 shadow-inner shadow-gray-600 z-20 flex flex-col justify-center items-center"
      style={{
        transform: open ? "translate(-50%, -50%)" : "translate(100%, -50%)",
        visibility: open ? "visible" : "hidden",
        transition: "all .5s ease-in-out",
      }}
    >
      <button
        onClick={() => setOpen(false)}
        className="w-5 aspect-square rounded-full absolute top-6 right-6 flex items-center"
      >
        <div className="w-full h-[2px] bg-gray-800 rotate-45 absolute rounded-full"></div>
        <div className="w-full h-[2px] bg-gray-800 -rotate-45 absolute rounded-full"></div>
      </button>
      <h1 className="text-lg underline">Instructions</h1>
      <ul className="list-disc list-outside [&_ul]:list-[revert]">
        <li>Click on task card to submit</li>
        <li>Make you submission</li>
        <li>Wait for Aavhan Managers to verify your submission</li>
        <li>
          Color Codes
          <ul className="list-disc pl-10">
            <li>Orange: Verification pending</li>
            <li>Green: Verified and Found Correct</li>
            <li>Red: Verified and Found Incorrect</li>
          </ul>
        </li>
        <li>Get verified and keeping going up the leaderboard</li>
      </ul>
    </div>
  );
}

export default function Tasks({ marginTop = true }) {
  const { isLoggedIn, showToast } = useAppContext();

  const [userCopy, setUserCopy] = useState({});
  const [sort, setSort] = useState("All");
  const [quesMark, toggleQuesMark] = useState(false);

  function handleSortChange(sortType, user) {
    setSort(sortType);

    let newCopy = JSON.parse(JSON.stringify(user));
    let filteredTasks;

    switch (sortType) {
      case "Verified":
        filteredTasks = newCopy.taskList.filter((task, index) => {
          if (index == 0) return true;

          const taskId = task[0];
          if (newCopy.tasksCompleted[taskId]) {
            return newCopy.tasksCompleted[taskId].some(
              (completion) => completion.verified === "Verified"
            );
          }
          return false;
        });
        newCopy.taskList = filteredTasks;
        break;

      case "Incomplete":
        filteredTasks = newCopy.taskList.filter((task, index) => {
          if (index === 0) return true;

          const taskId = task[0];
          return !newCopy.tasksCompleted[taskId];
        });
        newCopy.taskList = filteredTasks;
        break;

      case "Rejected":
        filteredTasks = newCopy.taskList.filter((task, index) => {
          if (index == 0) return true;

          const taskId = task[0];
          if (newCopy.tasksCompleted[taskId]) {
            return newCopy.tasksCompleted[taskId].some(
              (completion) => completion.verified === "Rejected"
            );
          }
          return false;
        });
        newCopy.taskList = filteredTasks;
        break;

      default:
        setSort("All");
        break;
    }

    setUserCopy(newCopy);
  }

  const {
    data: user = {},
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfile,
    enabled: isLoggedIn,
    onError(error) {
      showToast(error, "ERROR");
    },
    onSuccess: (data) => {
      handleSortChange("All", data);
      console.log(data);
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

  if (isSuccess)
    return (
      <div className="px-3">
        <DoubtTab open={quesMark} setOpen={toggleQuesMark} />
        <div
          className={
            "xl:sticky xl:top-[70px] z-10 flex flex-col gap-2 sm:w-full xl:max-w-screen-md mx-auto m-auto mb-3 font-bold tracking-wide text-slate-800 " +
            (marginTop && "mt-20")
          }
        >
          <div className="w-32 bg-white p-2 rounded-xl shadow-md shadow-gray-300 text-center text-xl m-auto relative">
            Tasks
            <button
              onClick={() => toggleQuesMark((v) => !v)}
              className="absolute font-sans top-1/2 -translate-y-1/2 -right-10 bg-white aspect-square w-7 rounded-full shadow-md shadow-gray-600"
            >
              ?
            </button>
          </div>
          <div className="flex gap-2 m-auto justify-center">
            {["All", "Verified", "Incomplete", "Rejected"].map((sortType) => (
              <button
                className={
                  "block bg-white px-2 py-1 rounded-xl shadow-md shadow-gray-300 text-center min-w-14 " +
                  (sortType == sort ? "border-2 border-gray-500" : "")
                }
                onClick={() => handleSortChange(sortType, user)}
              >
                {sortType}
              </button>
            ))}
          </div>
        </div>
        {userCopy?.taskList?.length <= 1 ? (
          <div className="text-center my-10">Nothing to show here</div>
        ) : (
          userCopy.taskList
            ?.slice(1)
            .reverse()
            .map((task, index) =>
              task[0] === "" ? (
                <div key={index}></div>
              ) : (
                <TaskCard
                  key={"task_num" + task[0]}
                  taskCompleted={
                    userCopy.tasksCompleted && userCopy.tasksCompleted[task[0]]
                      ? userCopy.tasksCompleted[task[0]]
                      : []
                  }
                  task={task}
                  headers={userCopy.taskList[0]}
                />
              )
            )
        )}
      </div>
    );

  return (
    <div className="bg-white flex flex-col gap-4 mx-auto py-10 px-20 rounded-2xl max-w-screen-md my-[100px]">
      Error
    </div>
  );
}
