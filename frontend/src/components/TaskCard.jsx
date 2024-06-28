import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { addUserTaskURL } from "../api-clients";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export default function TaskCard({ taskCompleted, task, headers }) {
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(addUserTaskURL, {
    onSuccess() {
      showToast("Task URL Submitted");
    },
    onError(error) {
      showToast(error, "ERROR");
    },
  });

  const onSubmit = handleSubmit((data) => {
    data.taskID = task[0];
    if (!mutation.isLoading) mutation.mutate(data);
  });

  return (
    <div className="bg-white flex flex-col gap-2 mx-auto my-5 pt-10 pb-5 px-10 rounded-2xl max-w-screen-md">
      <div className="task-item">
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
      {taskCompleted.length > 0 && (
        <>
          <hr className="border-gray-800"></hr>
          <div className="font-bold">Submitted task URL</div>
          <div className="flex flex-col overflow-auto">
            {taskCompleted.map((taskUrl, index) => (
              <Link
                key={index}
                to={taskUrl}
                className="text-blue-800 hover:underline"
              >
                {taskUrl}
              </Link>
            ))}
          </div>
        </>
      )}
      <hr className="border-gray-800"></hr>
      <div className="font-bold">Submit task</div>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <input
          type="url"
          placeholder="URL..."
          className="border border-gray-800 rounded w-full py-1 px-2 font-normal"
          {...register("url", {
            required: "URL is required",
          })}
        ></input>
        {errors.url && (
          <p className="text-red-700 font-normal">{errors.url.message}</p>
        )}
        <button
          type="submit"
          className="bg-gray-700 rounded m-auto text-white p-2 font-bold w-40"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Please Wait" : "Submit"}
        </button>
      </form>
    </div>
  );
}
