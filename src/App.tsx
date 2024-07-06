// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from 'react'
import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <>
            <main className="flex-auto">
                <Outlet />
            </main>
        </>
    )
}
