import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import goalService from "../services/goalService";
import Spinner from "../components/Spinner";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // return () => {
    //   dispatch(logout());
    // };
  }, [user]);

  const {
    data: goals = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all goals"],
    queryFn: () => goalService.getGoals(user.token),
  });

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  if (isError) return <p>Something went wrong while fetching goals.</p>;

  return (
    <div className="heading">
      <h1>Welcome {user && capitalize(user.name)}</h1>
      <p>Goals Dashboard</p>

      <GoalForm />

      {isLoading ? (
        <Spinner />
      ) : (
        <section className="content">
          {goals.length > 0 ? (
            <div className="goals">
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </div>
          ) : (
            <h3>You have not set any goals</h3>
          )}
        </section>
      )}
    </div>
  );
}

export default Dashboard;
