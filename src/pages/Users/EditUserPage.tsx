import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import Header from "../../components/common/Header";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";

import { apiPut } from "../../api/api";
import { userQueries } from "../../queries/userQueries";
import { userKeys } from "../../queries/queryKeys";

function EditUserPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [isDirty, setIsDirty] = useState(false);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery(userQueries.detail(userId));

  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setIsDirty(false);
  }, [user]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [isDirty]);

  const updateUserMutation = useMutation({
    mutationFn: async () => {
      return apiPut(
        `/users/${userId}`,
        {
          firstName,
          lastName,
          email,
        }
      );
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: userKeys.detail(userId),
      });

      await queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });

      setIsDirty(false);

      navigate(`/users/${userId}`);
    },
  });

  const handleBack = () => {
    if (
      isDirty &&
      !window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      )
    ) {
      return;
    }

    navigate(`/users/${userId}`);
  };

  if (!id || Number.isNaN(userId)) {
    return (
      <ErrorState message="Invalid user ID." />
    );
  }

  if (isLoading) {
    return (
      <Loader message="Loading user..." />
    );
  }

  if (isError) {
    return (
      <ErrorState
        message={
          error instanceof Error
            ? error.message
            : "Unable to load user."
        }
      />
    );
  }

  if (!user) {
    return (
      <ErrorState message="User not found." />
    );
  }

  return (
    <div className="edit-user-page">
      <Header title="Edit User" />

      <main className="edit-user-content">
        <button
          type="button"
          onClick={handleBack}
          disabled={updateUserMutation.isPending}
        >
          ← Back to User
        </button>

        <div className="edit-user-card">
          <h2>Edit User</h2>

          <form
            onSubmit={(event) => {
              event.preventDefault();

              updateUserMutation.mutate();
            }}
          >
            <div className="form-group">
              <label htmlFor="firstName">
                First Name
              </label>

              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                  setIsDirty(true);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name
              </label>

              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                  setIsDirty(true);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setIsDirty(true);
                }}
                required
              />
            </div>

            {updateUserMutation.isError && (
              <p className="form-error">
                Unable to update user. Please try again.
              </p>
            )}

            <div className="form-actions">
              <button
                type="button"
                onClick={handleBack}
                disabled={updateUserMutation.isPending}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updateUserMutation.isPending}
              >
                {updateUserMutation.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditUserPage;