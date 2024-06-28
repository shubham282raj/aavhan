import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { registerUser } from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BounceLoading from "../components/LoadingAnimations";

export default function Register() {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const navigate = useNavigate();

  const mutation = useMutation(registerUser, {
    onSuccess() {
      navigate("/profile");
      queryClient.invalidateQueries("validateToken");
      showToast("Registration Successfull");
    },
    onError(error) {
      showToast(error, "ERROR");
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!mutation.isLoading) mutation.mutate(data);
  });

  const [isPreview, setIsPreview] = useState(false);

  return (
    <form
      className=" bg-white flex flex-col gap-4 mx-auto my-10 p-10 rounded-2xl max-w-screen-md"
      onSubmit={onSubmit}
    >
      <div className="flex  items-center relative">
        {isPreview && (
          <button
            type="button"
            className=" absolute inline-block bg-white rounded-full w-10 aspect-square"
            onClick={() => setIsPreview((val) => !val)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-full h-full"
            >
              <path
                fill="rgb(30 41 59)"
                d="M48 256c0 114.87 93.13 208 208 208s208-93.13 208-208S370.87 48 256 48S48 141.13 48 256m212.65-91.36a16 16 0 0 1 .09 22.63L208.42 240H342a16 16 0 0 1 0 32H208.42l52.32 52.73A16 16 0 1 1 238 347.27l-79.39-80a16 16 0 0 1 0-22.54l79.39-80a16 16 0 0 1 22.65-.09"
              />
            </svg>
          </button>
        )}
        <h2 className="text-2xl font-bold text-slate-800 m-auto px-10">
          {!isPreview ? "Registration Form" : "Registration Preview"}
        </h2>
      </div>
      {!isPreview ? (
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 text-base font-bold flex-1">
            Name
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 100,
                  message: "This field must not exceed 100 characters",
                },
              })}
            ></input>
            {errors.name && (
              <p className="text-red-700 font-normal">{errors.name.message}</p>
            )}
          </label>
          <label className="text-gray-700 text-base font-bold flex-1">
            College
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("college", {
                required: "College is required",
                maxLength: {
                  value: 100,
                  message: "This field must not exceed 100 characters",
                },
              })}
            ></input>
            {errors.college && (
              <p className="text-red-700 font-normal">
                {errors.college.message}
              </p>
            )}
          </label>
          <label className="text-gray-700 text-base font-bold flex-1">
            Course Pursuing
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("coursePursuing", {
                required: "Course Pursuing is required",
                maxLength: {
                  value: 100,
                  message: "This field must not exceed 100 characters",
                },
              })}
            ></input>
            {errors.coursePersuing && (
              <p className="text-red-700 font-normal">
                {errors.coursePersuing.message}
              </p>
            )}
          </label>
          <label className="text-gray-700 text-base font-bold flex-1">
            Year of Study
            <div className="flex flex-col space-y-1 sm:flex-row sm:justify-evenly">
              {["1st year", "2nd year", "3rd year", "4th year", "5th year"].map(
                (year, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value={year}
                      {...register("yearOfStudy", {
                        required: "Year of Study is required",
                      })}
                      className="form-radio"
                    />
                    <span className="font-normal">{year}</span>
                  </label>
                )
              )}
            </div>
            {errors.yearOfStudy && (
              <p className="text-red-700 font-normal">
                {errors.yearOfStudy.message}
              </p>
            )}
          </label>
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
            Phone Number
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              type="number"
              {...register("phoneNumber", {
                required: " Phone Number is required",
                validate: (value) => {
                  const stringValue = value.toString();
                  return (
                    stringValue.length === 10 ||
                    "Phone Number must be exactly 10 digits"
                  );
                },
              })}
            ></input>
            {errors.phoneNumber && (
              <p className="text-red-700 font-normal">
                {errors.phoneNumber.message}
              </p>
            )}
          </label>
          <label className="text-gray-700 text-base font-bold flex-1">
            Address
            <textarea
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("address", {
                required: " Address is required",
                validate: (value) => {
                  const stringValue = value.toString();
                  return (
                    stringValue.length < 100 ||
                    "Address should not excceed 100 characters"
                  );
                },
              })}
            ></textarea>
            {errors.address && (
              <p className="text-red-700 font-normal">
                {errors.address.message}
              </p>
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
          <label className="text-gray-700 text-base font-bold flex-1">
            Confirm Password
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              type="password"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Passwords do not match";
                  } else {
                    return true;
                  }
                },
              })}
            ></input>
            {errors.confirmPassword && (
              <p className="text-red-700 font-normal">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>
          <button
            className="bg-gray-700 rounded m-auto text-white p-2 font-bold w-40"
            onClick={async () => {
              const result = await trigger();
              result && setIsPreview((value) => !value);
            }}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
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
                <strong>{field.label}:</strong> {watch(field.name)}
              </p>
            ))}
          </div>
          <button
            type="submit"
            className="bg-gray-700 rounded m-auto text-white p-2 font-bold w-40"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? <BounceLoading /> : "Register"}
          </button>
        </div>
      )}
    </form>
  );
}
