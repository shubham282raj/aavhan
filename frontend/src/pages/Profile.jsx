import { userProfile } from "../api-clients";
import { useQuery } from "react-query";
import SignOutButton from "../components/SignOutBtn";
import { useAppContext } from "../contexts/AppContext";

export default function Profile() {
  const { isLoggedIn, showToast } = useAppContext();

  const {
    data: user = {},
    isLoading,
    isError,
  } = useQuery({
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
    return (
      <div className="bg-white flex flex-col gap-4 mx-auto my-10 py-10 px-20 rounded-2xl max-w-screen-md">
        Please Wait...
      </div>
    );
  }

  return (
    <>
      <div className=" bg-white flex flex-col gap-4 mx-auto mt-10 mb-5 py-10 px-20 rounded-2xl max-w-screen-md">
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
      <div className="block w-32 bg-white mx-auto p-2 text-center text-xl m-auto font-bold tracking-wide text-slate-800 rounded-xl">
        Tasks
      </div>
      {user.taskList
        ?.slice(1)
        .reverse()
        .map((task, index) =>
          task[0] === "" ? (
            <div key={index}></div>
          ) : (
            <div className="bg-white flex flex-col gap-4 mx-auto my-5 pt-10 pb-5 px-10 rounded-2xl max-w-screen-md">
              <div key={index} className="task-item">
                {task.map((value, idx) =>
                  value === "" ? (
                    <div key={idx}></div>
                  ) : (
                    <div key={idx}>
                      <strong>{user.taskList[0][idx]}:</strong> {value}
                    </div>
                  )
                )}
              </div>
              <button className="bg-gray-700 rounded m-auto text-white p-2 font-bold w-40">
                Submit
              </button>
            </div>
          )
        )}
    </>
  );
}
