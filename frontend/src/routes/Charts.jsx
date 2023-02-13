import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'

const ChartPage  = () => {

    const charts = [
        { id: '63ea9436-28ca-41b6-8f4b-1430585e7ce6' },
        { id: '63ea9605-1d7c-4be3-8bbc-780c6cf8efc1' },
        { id: '63ea97f5-f7c5-4555-8409-fda2c81b9f45' }
    ]

    return (
        <main>
        <Link to="/vynils">
            <img
            />
        </Link>
        <div className='charts-container'>
            {charts.map((chart, index) => (
            <div
                key={chart.id}
                style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            }}
            >
            <iframe
                width="640"
                height="480"
                src={`https://charts.mongodb.com/charts-project-0-dfebe/embed/charts?id=${chart.id}&maxDataAge=3600&theme=light&autoRefresh=true`}
            />
            </div>
        ))}
        </div>
    </main>
    )
}

export default ChartPage


