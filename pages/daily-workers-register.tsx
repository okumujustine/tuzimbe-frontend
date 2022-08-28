import React from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'

const DailyWorkersRegister: NextPage = () => {
    return (
        <div>
            <Link href="/register-worker">
                <a>Register worker</a>
            </Link>
            <p>daily-workers-register</p>
        </div>
    )
}

export default DailyWorkersRegister
