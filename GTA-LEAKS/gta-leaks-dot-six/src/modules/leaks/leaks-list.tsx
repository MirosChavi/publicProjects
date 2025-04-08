import React, { memo, useEffect, useState } from "react";
import { fetchLeaks, LeakId, leaksSlice } from "./leaks.slice";
import { useAppDispatch, useAppSelector } from "../../store";

export default function LeaksList(): JSX.Element {
    const [sortType, setSortType] = useState<
        "latest" | "oldest" | "a-z" | "z-a"
    >("latest");
    const leaksPerPage = 9;
    const currentPage = useAppSelector((state) => state.leaks.page);

    const indexOfLastLeak = currentPage * leaksPerPage;
    const indexOfFirstLeak = indexOfLastLeak - leaksPerPage;
    const currentLeaks = useAppSelector((state) =>
        leaksSlice.selectors
            .selectSortedLeaks(state, sortType)
            .slice(indexOfFirstLeak, indexOfLastLeak)
    );

    const totalPages = Math.ceil(
        useAppSelector((state) => state.leaks.ids.length) / 9
    );

    const selectedLeakId = useAppSelector(
        leaksSlice.selectors.selectSelectedLeakId
    );

    return (
        <div className="p-2">
            {!selectedLeakId ? (
                <>
                    <div className="mx-auto flex justify-end">
                        <div className="px-2 max-w-xs w-full">
                            <label
                                htmlFor="example3"
                                className="flex justify-center mb-1 text-sm font-medium text-gray-700 after:text-red-500 after:content-['*']"
                            >
                                Sorting type
                            </label>
                            <select
                                id="example3"
                                className="m-2 cursor-pointer border-2 bg-black text-white focus border-purple-700 block w-full rounded-md shadow-sm disabled:cursor-not-allowed disabled:bg-black"
                                onChange={(event) =>
                                    setSortType(
                                        event.target
                                            .value as React.SetStateAction<
                                            "latest" | "oldest" | "a-z" | "z-a"
                                        >
                                    )
                                }
                                value={sortType}
                            >
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                                <option value="a-z">A-Z</option>
                                <option value="z-a">Z-A</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {currentLeaks.map((leak) => (
                            <LeakListItem leakId={leak._id} key={leak._id} />
                        ))}
                    </div>
                    <Pagination totalPages={totalPages} />
                </>
            ) : (
                <div className="flex">
                    <SelectedLeak leakId={selectedLeakId} />
                </div>
            )}
        </div>
    );
}

function SelectedLeak({ leakId }: { leakId: LeakId }) {
    const leak = useAppSelector((state) => state.leaks.entities[leakId]);
    const dispatch = useAppDispatch();

    return (
        <div className="text-white rounded p-10 w-full shadow-md hover:shadow-lg">
            <div className="flex justify-between gap-3 px-4">
                <h1 className="text-4xl font-bold">{leak.title}</h1>
                <div
                    className="flex gap-1 align-middle my-auto cursor-pointer"
                    onClick={() =>
                        dispatch(leaksSlice.actions.removeSelected())
                    }
                >
                    <CrossLightIcon className="text-white cursor-pointer mt-1" />
                    <p>back</p>
                </div>
            </div>
            <p className="text-slate-400 text-xl font-semibold mt-2">
                {leak.description}
            </p>
        </div>
    );
}

function Pagination({ totalPages }: { totalPages: number }) {
    const dispatch = useAppDispatch();
    const currentPage = useAppSelector((state) => state.leaks.page);

    const getPageNumbers = () => {
        const maxVisiblePages = 5;
        const pagesNumbers: number[] = [];
        if (totalPages <= maxVisiblePages) {
            Array.from({ length: totalPages }, (_, i) => pagesNumbers.push(i));
        } else {
            if (currentPage > 3 && currentPage <= totalPages) {
                for (
                    let i = currentPage - 3;
                    i < currentPage + 2 && i < totalPages;
                    i++
                ) {
                    pagesNumbers.push(i);
                }
            } else {
                for (let i = 0; i < maxVisiblePages; i++) pagesNumbers.push(i);
            }
        }
        return pagesNumbers;
    };

    return (
        <div className="flex justify-center overflow-hidden text-purple-800 gap-3 text-2xl m-3">
            <button
                className="hover:underline opacity-70 hover:opacity-100"
                onClick={() =>
                    currentPage > 1 &&
                    dispatch(
                        leaksSlice.actions.setPage({ page: currentPage - 1 })
                    )
                }
            >
                PREV
            </button>
            {currentPage > 3 && totalPages > 5 && (
                <p
                    onClick={() =>
                        dispatch(leaksSlice.actions.setPage({ page: 1 }))
                    }
                    className="cursor-pointer"
                >
                    ...
                </p>
            )}
            {getPageNumbers().map((i: number) => {
                return (
                    <button
                        className={`hover:underline hover:opacity-100 ${
                            currentPage === i + 1
                                ? "font-medium opacity-100 underline"
                                : "opacity-70"
                        }`}
                        onClick={() =>
                            dispatch(
                                leaksSlice.actions.setPage({ page: i + 1 })
                            )
                        }
                        key={i}
                    >
                        {i + 1}
                    </button>
                );
            })}
            {totalPages > 5 && currentPage <= totalPages - 2 && (
                <p
                    onClick={() =>
                        dispatch(
                            leaksSlice.actions.setPage({ page: totalPages })
                        )
                    }
                    className="cursor-pointer"
                >
                    ...
                </p>
            )}
            <button
                className="hover:underline opacity-70 hover:opacity-100 selection:opacity-100"
                onClick={() =>
                    currentPage < totalPages &&
                    dispatch(
                        leaksSlice.actions.setPage({ page: currentPage + 1 })
                    )
                }
            >
                NEXT
            </button>
        </div>
    );
}

const LeakListItem = memo(function ({ leakId }: { leakId: LeakId }) {
    const leak = useAppSelector((state) => state.leaks.entities[leakId]);

    const dispatch = useAppDispatch();

    const loading = useAppSelector((state) => state.leaks.loading);
    const error = useAppSelector((state) => state.leaks.error);

    useEffect(() => {
        dispatch(fetchLeaks());
    }, [dispatch]);

    if (loading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-white">Error: {error}</div>;

    return (
        <div
            className="cursor-pointer p-2 w-full h-96 overflow-hidden shadow-md hover:shadow-lg"
            onClick={() => dispatch(leaksSlice.actions.selected({ leakId }))}
        >
            <div className="overflow-hidden">
                <img
                    src={leak.img}
                    alt={leak.img}
                    className="hover:scale-110 transition-all duration-700 object-cover max-h-80 min-w-full"
                />
            </div>
            <h2 className="text-2xl underline underline-offset-8 text-white">
                {leak.title}
            </h2>
            <p className="text-slate-400">{leak.description}</p>
        </div>
    );
});

function CrossLightIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            id="svg2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 1200"
            height="1em"
            enable-background="new 0 0 1200 1200"
        >
            <path
                id="path19701"
                inkscape:connector-curvature="0"
                d="M808.969,133.929v257.06H942.94v267.899H417.981V508.763L0,787.417
	l417.982,278.654V915.946h524.959H1200V658.888V390.988v-257.06H942.941H808.969L808.969,133.929z"
                fill="currentColor"
            />
        </svg>
    );
}
