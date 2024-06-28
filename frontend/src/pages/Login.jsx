import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { loginUser } from "../api-clients";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(loginUser, {
    onSuccess() {
      console.log("Success");
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!mutation.isLoading) mutation.mutate(data);
  });

  return (
    <form
      className=" bg-white flex flex-col gap-4 mx-auto my-10 p-10 rounded-2xl max-w-screen-md"
      onSubmit={onSubmit}
    >
      <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 text-base font-bold flex-1">
          Email
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="email"
            {...register("email", {
              required: " Email is required",
              maxLength: {
                value: 100,
                message: "This field must not exceed 100 characters",
              },
            })}
          ></input>
          {errors.email && (
            <p className="text-red-700 font-normal">{errors.email.message}</p>
          )}
        </label>
        <label className="text-gray-700 text-base font-bold flex-1">
          Password
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="password"
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 6,
                message: "Password must be atleast 6 characters",
              },
              maxLength: {
                value: 18,
                message: "Password must not be greater than 18 characters",
              },
            })}
          ></input>
          {errors.password && (
            <p className="text-red-700 font-normal">
              {errors.password.message}
            </p>
          )}
        </label>
        <button
          type="submit"
          className="bg-gray-700 rounded m-auto text-white p-2 font-bold w-40"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Plesase Wait" : "Login"}
        </button>
      </div>
    </form>
  );
}
