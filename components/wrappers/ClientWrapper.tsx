import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
    children: React.ReactNode
}

export default function ClientWrapper({ children }: Props) {
    const rt = useRouter();
    const path = rt.pathname
    const linkActiveClassName = "flex text-white p-2 bg-gray-600 rounded-md hover:bg-gray-700 border-b-2 border-white"
    const linkNonActiveClassName = "flex text-white p-2 bg-gray-600 rounded-md hover:bg-gray-700 hover:border-b-2 hover:border-white"

    const activeCheck = (arr: string[]) => {
        return arr.includes(path) ? true : false
    }
    return (
        <div className="flex flex-row w-full min-h-screen">
            <div className="bg-gray-800 h-screen sticky top-0 w-64 py-4 px-3">
                <div className="h-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-gray-100">TUZIMBE</h3>
                        <ul className="mt-4">
                            <li className="py-2">
                                <Link className="p-2" href="/">
                                    <a
                                        className={activeCheck(["/", "/register-worker"]) ? linkActiveClassName : linkNonActiveClassName}
                                    >
                                        <span>Attendance</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link className="p-2" href="/list-material-usage">
                                    <a
                                        className={activeCheck(["/list-material-usage", "/add-material-usage"]) ? linkActiveClassName : linkNonActiveClassName}
                                    >
                                        <span>Material Usage</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link href="/workers">
                                    <a
                                        className={activeCheck(["/workers"]) ? linkActiveClassName : linkNonActiveClassName}
                                    >
                                        <span>Workers</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="py-2">
                                <Link href="/materials">
                                    <a
                                        className={activeCheck(["/materials", "/add-material"]) ? linkActiveClassName : linkNonActiveClassName}
                                    >
                                        <span>Materials</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-5">
                        <Link className="p-2" href="/admin-stats">
                            <a target="_blank" className="flex text-white p-2 border-gray-100 border rounded-md hover:bg-gray-100 hover:text-gray-800">
                                <span>Owner Admin</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className=" w-full p-6">
                {children}
            </div>
        </div>

    )
}
