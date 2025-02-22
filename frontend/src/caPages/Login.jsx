import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { loginUser } from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import BounceLoading from "../caComponents/LoadingAnimations";

export default function Login() {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const mutation = useMutation(loginUser, {
    onSuccess() {
      navigate("/profile");
      queryClient.invalidateQueries("validateToken");
      showToast("Logged In Successfully");
    },
    onError(error) {
      showToast(error, "ERROR");
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!mutation.isLoading) mutation.mutate(data);
  });

  return (
    <form
      className="bg-black bg-opacity-5 text-slate-800 flex flex-col gap-4 mx-3 sm:mx-auto p-10 rounded-2xl max-w-screen-md my-[100px] shadow-inner backdrop-blur-[2px]"
      onSubmit={onSubmit}
    >
      <h2 className="text-2xl font-bold">Welcome Back</h2>
      <div className="flex flex-col gap-4">
        <label className="text-base font-bold flex-1">
          Email
          <input
            className="rounded w-full py-1 px-2 font-normal"
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
        <label className="text-base font-bold flex-1">
          Password
          <input
            className="rounded w-full py-1 px-2 font-normal"
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
        <div className="m-auto">
          Haven't Registered Yet?{" "}
          <Link to={"/register"} className="underline hover:text-blue-800">
            Join Us
          </Link>
        </div>
        <button
          type="submit"
          className="bg-gray-700 rounded m-auto text-white p-2 font-bold w-40"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? <BounceLoading /> : "Login"}
        </button>
      </div>
    </form>
  );
}
