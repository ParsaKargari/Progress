import React from 'react'
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import WhatshotIcon from '@mui/icons-material/Whatshot';


export default function ActivityHeatMap() {

    const [selected, setSelected] = useState('')

    // Tasks completed today
    const tasksCompleted = 5;

    // TODO: Replace this with actual data
    const data = [
        { date: '2024/01/11', count: 2 },
        { date: '2024/02/12', count: 5 },
        { date: '2024/03/13', count: 10 },
    ];

    const handleCellClick = (date) => {
        setSelected(date);
    };

    return (
        <div>
            <div className='ml-2 mb-4'>
            <Chip label={`${tasksCompleted} tasks completed today`}
                icon={<WhatshotIcon />}
                sx={{
                    color: 'white',
                    backgroundColor: '#00789E',
                    '& .MuiChip-icon': {
                    color: 'white', // Ensures the icon is also white
                },
              }}/>
              </div>

            <HeatMap
                value={data}
                weekLabels={['', 'M', '', 'W', '', 'F', '']}
                startDate={new Date('2024/01/01')}
                endDate={new Date('2024/05/19')}
                width={500}
                rectSize={20} // Increase the size of each cell to zoom in on the heatmap
                style={{ height: '210px' }}
                rectRender={(props, data) => {
                    return (
                        <Tooltip content={`${data.date}, Count: ${data.count || '0'}`} key={props.key}>
                            <rect {...props} onClick={() => handleCellClick(data.date)} />
                        </Tooltip>
                    );
                }}
            />
        </div>
    )
}
