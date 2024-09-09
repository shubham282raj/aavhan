import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addUserTaskURL } from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import BounceLoading from "./LoadingAnimations";
import { useState } from "react";

export default function TaskCard({ taskCompleted, task, headers }) {
  const { showToast } = useAppContext();

  const [showSub, setShowSub] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const mutation = useMutation(addUserTaskURL, {
    onSuccess() {
      showToast("Task URL Submitted");
      queryClient.invalidateQueries("profile");
    },
    onError(error) {
      showToast(error, "ERROR");
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("taskID", task[0]);
    formData.append("filename", data.filename);
    if (!mutation.isLoading) mutation.mutate(formData);
  });

  return (
    <div className="bg-white bg-opacity-60 shadow-md flex flex-col gap-2 mx-auto my-2 py-7 px-10 rounded-2xl max-w-screen-md cursor-pointer">
      <div
        className="task-item relative"
        onClick={() => {
          setShowSub((val) => !val);
        }}
      >
        {taskCompleted.length > 0 &&
          (Object.keys(taskCompleted).some(
            (key) => taskCompleted[key].verified === "Pending"
          ) ? (
            <div className="p-2 w-fit rounded-full bg-orange-500 absolute -left-5 top-1"></div>
          ) : (
            <div className="p-2 w-fit rounded-full bg-green-500 absolute -left-5 top-1"></div>
          ))}
        {task.map((value, idx) =>
          value === "" || headers[idx] === "" ? (
            <div key={idx}></div>
          ) : (
            <div key={idx}>
              <strong>{headers[idx]}:</strong> {value}
            </div>
          )
        )}
      </div>
      {showSub && (
        <div className="flex flex-col gap-2 cursor-default">
          {taskCompleted.length > 0 && (
            <>
              <hr className="border-gray-800"></hr>
              <div className="font-bold">Submitted Tasks</div>
              <div className="flex flex-col overflow-auto">
                {taskCompleted.map((task, index) => (
                  <div className="flex justify-between">
                    <div
                      key={index}
                      onClick={async () => {
                        const response = await fetch(task.url);
                        const blob = await response.blob();
                        const element = document.createElement("a");
                        element.href = URL.createObjectURL(blob);
                        element.download = task.filename;
                        element.click();
                      }}
                      className="text-blue-800 underline cursor-pointer w-fit"
                    >
                      {task.filename}
                    </div>
                    <div
                      className="px-1 border rounded text-white font-bold"
                      style={{
                        backgroundColor:
                          task.verified == "Verified"
                            ? "Green"
                            : task.verified == "Rejected"
                            ? "Red"
                            : "Orange",
                      }}
                    >
                      {task.verified == "Verified"
                        ? "Verified"
                        : task.verified == "Rejected"
                        ? "Rejected"
                        : "Pending"}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <hr className="border-gray-800"></hr>
          <div className="font-bold">Submit Task</div>
          <form className="flex flex-col gap-2" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="File Name..."
              className="border border-gray-800 rounded w-full py-1 px-2 font-normal"
              {...register("filename", {
                required: "File Name is required",
              })}
            ></input>
            {errors.filename && (
              <p className="text-red-700 font-normal">
                {errors.filename.message}
              </p>
            )}
            <input
              type="file"
              {...register("file")}
              className="file:rounded-md file:bg-gray-700 file:text-white file:px-2 file:py-[2px] cursor-pointer file:cursor-pointer"
            ></input>
            <button
              type="submit"
              className="bg-gray-700 rounded m-auto text-white p-2 font-bold w-40"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? <BounceLoading /> : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
