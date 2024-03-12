import React from 'react'
import HeatMap from '@uiw/react-heat-map';


export default function ActivityHeatMap() {

    // TODO: Replace this with actual data
    const data = [
        { date: '2024/01/11', count: 2 },
        { date: '2024/02/12', count: 5 },
        { date: '2024/03/13', count: 10 },
    ];

    return (
        <div>
            <HeatMap
                value={data}
                weekLabels={['', 'M', '', 'W', '', 'F', '']}
                startDate={new Date('2024/01/01')}
                endDate={new Date('2024/05/19')}
                width={500}
                rectSize={20} // Increase the size of each cell to zoom in on the heatmap
                tooltipTitle={({ date, count }) => `${date} - ${count} tasks`}
                style={{ height: '210px' }}
            />
        </div>
    )
}
