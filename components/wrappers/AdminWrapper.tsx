import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
  children: React.ReactNode
}

export default function AdminWrapper({ children }: Props) {
  const rt = useRouter();
  const path = rt.pathname
  const linkActiveClassName = "flex text-white p-2 bg-green-700 rounded-md hover:bg-green-700 border-b-2 border-white"
  const linkNonActiveClassName = "flex text-white p-2 bg-green-700 rounded-md hover:bg-green-700 hover:border-b-2 hover:border-white"

  const activeCheck = (arr: string[]) => {
    return arr.includes(path) ? true : false
  }
  return (
    <div className="flex flex-row w-full min-h-screen">
      <div className="bg-green-900 h-screen sticky top-0 w-64 py-4 px-3">
        <div className="h-full flex flex-col justify-between">
          <div>
            <h3 className="text-gray-100">TUZIMBE OWNER ADMIN</h3>
            <ul className="mt-4">
              <li className="py-2">
                <Link className="p-2" href="/">
                  <a
                    className={activeCheck(["/admin-stats"]) ? linkActiveClassName : linkNonActiveClassName}
                  >
                    <span>Material Usage Stats</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <Link className="p-2" href="/">
              <a className="flex text-white p-2 border-gray-100 border rounded-md hover:bg-gray-100 hover:text-gray-800">
                <span>Client Admin</span>
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
