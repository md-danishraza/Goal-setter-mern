import { toast } from "react-toastify";
import goalService from "../services/goalService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function GoalItem({ goal }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => goalService.deleteGoal(goal._id),
    onSuccess: () => {
      // console.log("goal deleted");
      queryClient.invalidateQueries({ queryKey: ["all goals"] });
    },
  });

  const handleDelete = () => {
    // console.log("goal deleted");
    deleteMutation.mutate();
    toast.success("deletion successfull");
    // DELETE
    // invalidate allgoals query;
  };
  return (
    <div className="goal">
      <p>{new Date(goal.createdAt).toLocaleString("en-US")}</p>
      <h2>{goal.text}</h2>
      <button onClick={handleDelete} className="close">
        X
      </button>
    </div>
  );
}

export default GoalItem;
