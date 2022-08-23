import React from 'react'
import Link from "next/link";

interface Props {
    children: React.ReactNode
}

export default function ClientWrapper({ children }: Props) {
    return (
        <div className="flex flex-row w-full bg-red-100 min-h-screen">
            <div className="bg-gray-800 fixed w-2/12 h-screen py-4 px-3">
                <div>
                    <h3 className="text-gray-100">TUZIMBE</h3>
                    <ul className="mt-4">
                        <li className="py-2">
                            <Link className="p-2" href="/">
                                <a className="flex text-white p-2 bg-gray-600 rounded-md">
                                    Workers
                                </a>
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link href="/">
                                <a className="flex text-white p-2 bg-gray-600 rounded-md">
                                    Materials
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-blue-50 w-full">
                {children}
            </div>
        </div>

    )
}
