import { allUsers } from "../api-clients";
import { useQuery } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { LoadingAnimation } from "../components/LoadingAnimations";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { verifyTask } from "../api-clients";

function UserCard({ user, tasks }) {
  const { showToast } = useAppContext();

  const [show, setShow] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation(verifyTask, {
    onSuccess() {
      showToast("Task Verification Done");
      queryClient.invalidateQueries("admin-all");
    },
    onError(error) {
      showToast(error, "ERROR");
    },
  });

  return (
    <>
      <div className="m-auto bg-white max-w-screen-md w-full rounded-lg p-3 flex flex-col">
        <div
          className=""
          onClick={() => {
            setShow((val) => !val);
          }}
        >
          {[
            { label: "ID", name: "id" },
            { label: "Name", name: "name" },
            { label: "College", name: "college" },
          ].map((field, index) => (
            <p key={index}>
              <strong>{field.label}:</strong> {user[field.name]}
            </p>
          ))}
          {Object.keys(user.tasksCompleted).some((key) =>
            user.tasksCompleted[key].some(
              (upload) => upload.verified === "Pending"
            )
          ) &&
            !show && (
              <div
                className="rounded-lg w-fit px-2 py-1"
                style={{ backgroundColor: "Orange" }}
              >
                Pending Requests
              </div>
            )}
        </div>
        {show && (
          <div>
            <div
              onClick={() => {
                setShow((val) => !val);
              }}
            >
              {[
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
            {tasks
              ?.slice(1)
              .reverse()
              .map((task, index) =>
                task[0] === "" ? (
                  <div key={index}></div>
                ) : (
                  <div>
                    {user.tasksCompleted && user.tasksCompleted[task[0]] && (
                      <div className="border border-black p-2 mx-5 my-1">
                        {task.map((value, idx) =>
                          value === "" || tasks[0][idx] === "" ? (
                            <div key={idx}></div>
                          ) : (
                            <div key={idx}>
                              <strong>{tasks[0][idx]}:</strong> {value}
                            </div>
                          )
                        )}
                        <div className="flex flex-col overflow-auto">
                          {user.tasksCompleted[task[0]].map(
                            (userTask, index) => (
                              <div className="flex justify-between">
                                <div
                                  key={index}
                                  onClick={async () => {
                                    const response = await fetch(userTask.url);
                                    const blob = await response.blob();
                                    const element = document.createElement("a");
                                    element.href = URL.createObjectURL(blob);
                                    element.download = userTask.filename;
                                    element.click();
                                  }}
                                  className="text-blue-800 underline cursor-pointer w-fit"
                                >
                                  {userTask.filename}
                                </div>
                                <div className="flex gap-1">
                                  {["Verified", "Pending", "Rejected"].map(
                                    (status) => (
                                      <button
                                        onClick={() => {
                                          mutation.mutate({
                                            caID: user._id,
                                            taskID: task[0],
                                            taskURL: userTask.url,
                                            status: status,
                                          });
                                        }}
                                        className="border rounded px-2 my-1 text-black"
                                        style={{
                                          backgroundColor:
                                            status == userTask.verified
                                              ? userTask.verified == "Verified"
                                                ? "Green"
                                                : userTask.verified ==
                                                  "Rejected"
                                                ? "Red"
                                                : "Orange"
                                              : userTask.verified ===
                                                  undefined &&
                                                status === "Pending" &&
                                                "Orange",
                                        }}
                                      >
                                        {status}
                                      </button>
                                    )
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
          </div>
        )}
      </div>
    </>
  );
}

export default function Admin() {
  const { isLoggedIn, showToast } = useAppContext();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-all"],
    queryFn: allUsers,
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
    <div className="my-5 flex flex-col gap-5">
      {data?.users?.map((user) => {
        return <UserCard user={user} tasks={data.tasks} />;
      })}
    </div>
  );
}
