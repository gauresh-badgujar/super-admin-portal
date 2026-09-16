import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import Header from "../../components/common/Header";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import { useDebounce } from "../../hooks/useDebounce";

import { apiDelete } from "../../api/api";
import { userQueries } from "../../queries/userQueries";
import { userKeys } from "../../queries/queryKeys";

function UsersPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const filters = {
        search: debouncedSearch,
        role: "",
        status: "",
        tenantId: undefined,
        page,
    };

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useQuery(userQueries.list(filters));

    const deleteUserMutation = useMutation({
        mutationFn: async (userId: number) => {
            return apiDelete(`/users/${userId}`);
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: userKeys.lists(),
            });
        },
    });

    useEffect(() => {
        if (
            !deleteUserMutation.isSuccess &&
            !deleteUserMutation.isError
        ) {
            return;
        }

        const timer = window.setTimeout(() => {
            deleteUserMutation.reset();
        }, 3000);

        return () => {
            window.clearTimeout(timer);
        };
    }, [
        deleteUserMutation.isSuccess,
        deleteUserMutation.isError,
        deleteUserMutation,
    ]);

    if (isLoading) {
        return <Loader message="Loading users..." />;
    }

    if (isError) {
        return (
            <ErrorState
                message={
                    error instanceof Error
                        ? error.message
                        : "Unable to load users."
                }
                onRetry={() => {
                    void refetch();
                }}
            />
        );
    }

    if (!data || data.users.length === 0) {
        return (
            <EmptyState
                title="No users found"
                message="There are no users to display."
            />
        );
    }

    const handlePreviousPage = () => {
        if (page <= 1) {
            return;
        }

        setPage((currentPage) => currentPage - 1);
    };

    const handleNextPage = () => {
        if (page >= data.totalPages) {
            return;
        }

        setPage((currentPage) => currentPage + 1);
    };

    return (
        <div className="users-page">
            <Header title="User Management" />

            <main className="users-content">
                <div className="users-filters">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setPage(1);
                        }}
                    />
                </div>

                <div className="users-header">
                    <div>
                        <h2>Users</h2>
                        <p>Total Users: {data.total}</p>
                    </div>

                    {isFetching && <span>Updating...</span>}
                </div>

                {deleteUserMutation.isError && (
                    <div className="toast toast-error">
                        Unable to delete user. Please try again.
                    </div>
                )}

                {deleteUserMutation.isSuccess && (
                    <div className="toast toast-success">
                        User deleted successfully.
                    </div>
                )}

                <div className="users-table-wrapper">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Tenant</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        {user.firstName} {user.lastName}
                                    </td>

                                    <td>{user.email}</td>

                                    <td>{user.company.title}</td>

                                    <td>{user.company.name}</td>

                                    <td>Active</td>

                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigate(`/users/${user.id}`);
                                            }}
                                        >
                                            View
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigate(`/users/${user.id}/edit`);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            disabled={deleteUserMutation.isPending}
                                            onClick={() => {
                                                const confirmed = window.confirm(
                                                    `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
                                                );

                                                if (!confirmed) {
                                                    return;
                                                }

                                                deleteUserMutation.mutate(user.id);
                                            }}
                                        >
                                            {deleteUserMutation.isPending
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="users-pagination">
                    <button
                        type="button"
                        onClick={handlePreviousPage}
                        disabled={page <= 1 || isFetching}
                    >
                        Previous
                    </button>

                    <span>
                        Page {page} of {data.totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={handleNextPage}
                        disabled={
                            page >= data.totalPages || isFetching
                        }
                    >
                        Next
                    </button>
                </div>
            </main>
        </div>
    );
}

export default UsersPage;