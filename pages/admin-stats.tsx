import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';

import AdminWrapper from '../components/wrappers/AdminWrapper'
import Title from '../components/text/Title'
import CustomModal from '../components/public/Modal';
import { fomatDate } from '../helpers/utils';
import { materialsUsageStats } from '../resource/materialsUsageStats';
import { MaterialsUsageStatsResp } from '../helpers/workers/types';

type DateRangeDate = {
    startDate: Date
    endDate: Date
    key: string
}
const AdminStats: NextPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [state, setState] = useState<DateRangeDate[]>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const [dateToShowRange, setDateToShowRange] = useState<{
        startDateFinal: any,
        endDateFinal: any,
    } | null>(null)
    const [stats, setStats] = useState<MaterialsUsageStatsResp[]>([])

    const onSearch = async () => {
        setLoading(true)
        const startDate = state[0].startDate
        const endDate = state[0].endDate
        const startDateFinal = fomatDate(startDate.toLocaleDateString())
        const endDateFinal = fomatDate(endDate.toLocaleDateString())

        setDateToShowRange({
            startDateFinal,
            endDateFinal
        })

        const stats = await materialsUsageStats({
            start_date: startDateFinal,
            end_date: endDateFinal
        })

        if (typeof stats !== "string") {
            setStats(stats)
        } else {
            alert(stats)
        }
        setIsOpen(false)
        setLoading(false)
    }
    const onOpenModal = () => {
        setIsOpen(true)
    }

    const allStats = async () => {
        setLoading(true)
        const stats = await materialsUsageStats({})
        console.log(stats)
        if (typeof stats !== "string") {
            setStats(stats)
        } else {
            alert(stats)
        }
        setIsOpen(false)
        setLoading(false)
    }

    useEffect(() => {
        allStats()
    }, [])

    return (
        <AdminWrapper>
            <div>
                <Title text="Materials usage statistics" />
                <button
                    className="border text-gray-800 border-gray-800 rounded-full px-5 py-3 mt-3"
                    onClick={onOpenModal}
                >
                    Filter material stats
                </button>
                <div>
                    <CustomModal
                        modalIsOpen={modalIsOpen}
                        closeModal={() => setIsOpen(false)}
                        confirmButton={{
                            classes: "my-6 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        }}
                        onConfirm={onSearch}
                    >
                        <div>
                            <p>date range here</p>
                            <DateRangePicker
                                onChange={item => setState([item.selection as DateRangeDate])}
                                moveRangeOnFirstSelection={false}
                                months={1}
                                ranges={state}
                                direction="horizontal"
                                preventSnapRefocus={true}
                                calendarFocus="forwards"
                            />
                        </div>
                    </CustomModal>
                    <div className="mt-6">
                        {dateToShowRange?.startDateFinal && dateToShowRange?.endDateFinal ?
                            <p>Showing stats for {dateToShowRange?.startDateFinal}  to {dateToShowRange?.endDateFinal}</p>
                            : <>
                                {stats.length > 0 ? <p>Showing stats for all </p> : null}
                            </>
                        }


                        <div className="mt-5">
                            {isLoading ? <div><p>Loading materials attendance...</p></div> : null}
                            {!isLoading && stats.length <= 0 ? <div>
                                <p>No material found with the current (selected) date range</p>
                            </div> : null}
                            {!isLoading && stats.length > 0 ? <div className="flex flex-row flex-wrap">
                                {stats.map((stat, index) =>
                                    <div key={stat.material_id} className="w-2/12 mr-2 mb-3 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{stat.material__name}</h5>
                                        <p>Qty: {stat.material__name}</p>
                                        <p>Price: {stat.total_price}</p>
                                    </div>)}
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        </AdminWrapper>
    )
}

export default AdminStats