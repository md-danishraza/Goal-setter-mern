import React, { useState } from "react";
import goalService from "../services/goalService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function GoalForm() {
  const [text, setText] = useState("");
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: () => goalService.createGoal({ text }, user.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all goals"] });
      toast.success("Goal added successfully");
      setText("");
    },
    onError: (error) => {
      toast.error("Failed to add goal. Please try again.");
      console.error("Add goal error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.warning("Goal cannot be empty!");
      return;
    }
    addMutation.mutate();
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="text">Goal</label>
        <input
          type="text"
          name="text"
          id="text"
          minLength={5}
          maxLength={100}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={addMutation.isLoading}
        />
      </div>
      <div className="form-group">
        <button
          className="btn btn-block"
          type="submit"
          disabled={addMutation.isLoading}
        >
          {addMutation.isLoading ? "Adding..." : "Add Goal"}
        </button>
      </div>
    </form>
  );
}

export default GoalForm;
