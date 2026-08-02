import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { BookOpen } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SearchBar from "../../components/Plans/SearchBar";
import FilterBar from "../../components/Plans/FilterBar";
import PlanCard from "../../components/Plans/PlanCard";
import EditPlanModal from "../../components/Plans/EditPlanModal";

import {
  getPlans,
  deletePlanner,
  updatePlanner,
} from "../../services/PlannerService";

import "./MyPlans.css";

function MyPlans() {
  const [plans, setPlans] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);

      const data = await getPlans();

      setPlans(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail || "Failed to load plans"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this planner?"
    );

    if (!confirmDelete) return;

    try {
      await deletePlanner(id);

      toast.success("Planner Deleted Successfully 🗑️");

      setPlans((prev) =>
        prev.filter((plan) => plan.id !== id)
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to delete planner"
      );
    }
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updatePlanner(id, updatedData);

      toast.success("Planner Updated Successfully ✨");

      setIsModalOpen(false);
      setSelectedPlan(null);

      loadPlans();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to update planner"
      );
    }
  };

  const handleMarkCompleted = async (plan) => {
    try {
      await updatePlanner(plan.id, {
        subject: plan.subject,
        topic: plan.topic,
        study_date: plan.study_date,
        status: "Completed",
      });

      toast.success("Plan marked as Completed ✅");

      loadPlans();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to update planner."
      );
    }
  };

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const subject = (plan.subject || "").toLowerCase();
      const topic = (plan.topic || "").toLowerCase();

      const matchesSearch =
        subject.includes(search.toLowerCase()) ||
        topic.includes(search.toLowerCase());

      if (filter === "completed") {
        return (
          matchesSearch &&
          plan.status?.toLowerCase() === "completed"
        );
      }

      if (filter === "pending") {
        return (
          matchesSearch &&
          plan.status?.toLowerCase() === "pending"
        );
      }

      return matchesSearch;
    });
  }, [plans, search, filter]);

  return (
    <div className="myplans-page">
      <Sidebar />

      <main className="myplans-content">

        {/* Header */}

       <div className="page-header">

  <div className="page-title">

    <BookOpen size={34} />

    <div>

      <h1>My Study Plans</h1>

      <p>
        Manage all your saved AI study plans.
      </p>

    </div>

  </div>

</div>

        {/* Search */}

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {/* Filter */}

        <FilterBar
          filter={filter}
          setFilter={setFilter}
        />

        {/* Content */}

        {loading ? (

          <div className="myplans-empty-state">

            <h3>⏳ Loading Plans...</h3>

          </div>

        ) : filteredPlans.length === 0 ? (

          <div className="myplans-empty-state">

            <h3>📚 No Plans Found</h3>

            <p>
              Generate your first AI study plan to get started.
            </p>

          </div>

        ) : (

          <div className="plans-grid">

            {filteredPlans.map((plan) => (

              <PlanCard
                key={plan.id}
                plan={plan}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onComplete={handleMarkCompleted}
              />

            ))}

          </div>

        )}

        {/* Edit Modal */}

        <EditPlanModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPlan(null);
          }}
          plan={selectedPlan}
          onSave={handleUpdate}
        />

      </main>
    </div>
  );
}

export default MyPlans;