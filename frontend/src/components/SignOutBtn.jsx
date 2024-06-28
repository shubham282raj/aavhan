import { signOut } from "../api-clients";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "react-query";
import BounceLoading from "./LoadingAnimations";

export default function SignOutButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { showToast } = useAppContext();

  const mutation = useMutation(signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
      showToast("Signed Out", "SUCCESS");
    },
    onError: (error) => {
      showToast(error, "ERROR");
    },
  });

  return (
    <button
      className="bg-gray-700 rounded m-auto text-white p-2 font-bold w-40"
      onClick={() => {
        if (!mutation.isLoading) mutation.mutate();
      }}
      disabled={mutation.isLoading}
    >
      {mutation.isLoading ? <BounceLoading /> : "Sign Out"}
    </button>
  );
}
