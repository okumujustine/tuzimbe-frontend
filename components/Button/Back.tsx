import Link from 'next/link'
import React from 'react'


interface Props {
    title?: string,
    link: string
}
function Back(props: Props) {
    return (
        <div>
            <Link href={props.link}>
                <a className="bg-gray-800 text-gray-50 rounded-md px-3 py-1">{props.title ? props.title : "Back"}</a>
            </Link>
        </div>
    )
}

export default Back