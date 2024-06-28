import { useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form
      className=" bg-white flex flex-col gap-4 mx-auto my-10 p-10 rounded-2xl max-w-screen-md"
      onSubmit={onSubmit}
    >
      <h2 className="text-2xl font-bold text-slate-800">Create an Account</h2>
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
            <p className="text-red-700 font-normal">{errors.college.message}</p>
          )}
        </label>
        <label className="text-gray-700 text-base font-bold flex-1">
          Course Pursuing
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("coursePersuing", {
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
            <p className="text-red-700 font-normal">{errors.address.message}</p>
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
          type="submit"
          className="bg-gray-700 rounded m-auto text-white p-2 font-bold w-40"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}
