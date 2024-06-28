import { userProfile } from "../api-clients";
import { useQuery } from "react-query";
import SignOutButton from "../components/SignOutBtn";
import { useAppContext } from "../contexts/AppContext";
import TaskCard from "../components/TaskCard";
import { LoadingAnimation } from "../components/LoadingAnimations";

export default function Profile() {
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
      <div className="bg-white flex flex-col gap-4 mx-auto my-10 py-10 px-20 rounded-2xl max-w-screen-md">
        You must login to access this page
      </div>
    );
  }

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="xl:flex gap-2">
      <div className="xl:sticky xl:top-[70px] xl:w-full xl:max-h-[60vh] bg-white flex flex-col gap-4 mx-auto mt-10 mb-5 py-10 px-20 rounded-2xl max-w-screen-md">
        <div className="text-2xl m-auto font-bold tracking-wide text-slate-800">
          Profile
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: "Name", name: "name" },
            { label: "College", name: "college" },
            { label: "Course Pursuing", name: "coursePursuing" },
            { label: "Year of Study", name: "yearOfStudy" },
            { label: "Email", name: "email" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Address", name: "address" },
          ].map((field, index) => (
            <p key={index}>
              <strong>{field.label}:</strong> {user[field.name]}
            </p>
          ))}
        </div>
        <SignOutButton />
      </div>
      <div>
        <div className="xl:sticky xl:top-[70px] xl:border-b-2 xl:border-b-slate-800 block w-32 xl:w-full bg-white mx-auto p-2 text-center text-xl m-auto mt-10 mb-5 font-bold tracking-wide text-slate-800 rounded-xl">
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
                  user.tasksCompleted[task[0]]
                    ? user.tasksCompleted[task[0]]
                    : []
                }
                task={task}
                headers={user.taskList[0]}
              />
            )
          )}
      </div>
    </div>
  );
}
