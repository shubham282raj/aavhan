import { userProfile } from "../api-clients";
import { useQuery } from "react-query";
import SignOutButton from "../components/SignOutBtn";

export default function Profile() {
  const { data: user = {} } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfile,
    onError: (error) => alert(error),
  });

  return (
    <div className=" bg-white flex flex-col gap-4 mx-auto my-10 p-10 px-20 rounded-2xl max-w-screen-md">
      <div className="text-2xl m-auto font-bold tracking-wide text-slate-800">
        Profile
      </div>
      <div className="flex flex-col gap-4">
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
  );
}
