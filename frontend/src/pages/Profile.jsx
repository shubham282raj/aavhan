import { refreshLeaderboard, userProfile } from "../api-clients";
import { useMutation, useQuery } from "react-query";
import SignOutButton from "../components/SignOutBtn";
import { useAppContext } from "../contexts/AppContext";
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

  const mutation = useMutation({
    mutationKey: ["refreshLeaderboard"],
    mutationFn: refreshLeaderboard,
    onSuccess() {
      showToast("Leaderboard Refresh Success");
    },
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
      <div className="xl:sticky xl:top-[70px] w-full bg-white flex flex-col gap-4 mx-auto mt-10 mb-5 py-10 px-20 rounded-2xl max-w-screen-md">
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
        {user.admin && (
          <a
            href="/admin"
            className="bg-gray-700 rounded m-auto text-center text-white p-2 font-bold w-48"
          >
            Go to Admin Page
          </a>
        )}
        {user.admin && (
          <button
            onClick={() => {
              mutation.mutate();
            }}
            className="bg-gray-700 rounded m-auto text-center text-white p-2 font-bold w-48"
          >
            {mutation.isLoading ? "Please Wait..." : "Refresh Leaderboard"}
          </button>
        )}
      </div>
    </div>
  );
}
