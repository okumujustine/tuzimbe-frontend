import React from 'react'
import Link from "next/link";

interface Props {
    children: React.ReactNode
}

export default function ClientWrapper({ children }: Props) {
    return (
        <div className="flex flex-row w-full min-h-screen">
            <div className="bg-gray-800 h-screen sticky top-0 w-64 py-4 px-3">
                <div>
                    <h3 className="text-gray-100">TUZIMBE</h3>
                    <ul className="mt-4">
                        <li className="py-2">
                            <Link className="p-2" href="/">
                                <a className="flex text-white p-2 bg-gray-600 rounded-md hover:bg-gray-700">
                                    <span>Home</span>
                                </a>
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link href="/workers">
                                <a className="flex text-white p-2 bg-gray-600 rounded-md hover:bg-gray-700">
                                    <span>Workers</span>
                                </a>
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link href="/materials">
                                <a className="flex text-white p-2 bg-gray-600 rounded-md hover:bg-gray-700">
                                    <span>Materials</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className=" w-full p-6">
                {children}
            </div>
        </div>

    )
}
