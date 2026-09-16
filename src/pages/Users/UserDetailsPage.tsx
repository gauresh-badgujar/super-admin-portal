import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Header from "../../components/common/Header";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

import { userQueries } from "../../queries/userQueries";

function UserDetailsPage() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const userId = Number(id);

    const {
        data: user,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery(userQueries.detail(userId));

    if (!id || Number.isNaN(userId)) {
        return <ErrorState message="Invalid user ID." />;
    }

    if (isLoading) {
        return <Loader message="Loading user details..." />;
    }

    if (isError) {
        return (
            <ErrorState
                message={
                    error instanceof Error
                        ? error.message
                        : "Unable to load user details."
                }
                onRetry={() => {
                    void refetch();
                }}
            />
        );
    }

    if (!user) {
        return (
            <EmptyState
                title="User not found"
                message="The requested user could not be found."
            />
        );
    }

    return (
        <div className="user-details-page">
            <Header title="User Details" />

            <main className="user-details-content">
                <button
                    type="button"
                    onClick={() => {
                        navigate("/users");
                    }}
                >
                    ← Back to Users
                </button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(`/users/${user.id}/edit`);
                    }}
                >
                    Edit User
                </button>

                <div className="user-details-card">
                    <div className="user-details-header">
                        <div className="user-details-avatar">
                            {user.firstName.charAt(0)}
                            {user.lastName.charAt(0)}
                        </div>

                        <div>
                            <h2>
                                {user.firstName} {user.lastName}
                            </h2>

                            <p>{user.email}</p>
                        </div>
                    </div>

                    <div className="user-details-grid">
                        <div>
                            <span>First Name</span>
                            <strong>{user.firstName}</strong>
                        </div>

                        <div>
                            <span>Last Name</span>
                            <strong>{user.lastName}</strong>
                        </div>

                        <div>
                            <span>Email</span>
                            <strong>{user.email}</strong>
                        </div>

                        <div>
                            <span>Phone</span>
                            <strong>{user.phone}</strong>
                        </div>

                        <div>
                            <span>Role</span>
                            <strong>{user.company.title}</strong>
                        </div>

                        <div>
                            <span>Department</span>
                            <strong>{user.company.department}</strong>
                        </div>

                        <div>
                            <span>Company</span>
                            <strong>{user.company.name}</strong>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UserDetailsPage;