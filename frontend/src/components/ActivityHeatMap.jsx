import React from 'react'
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import WhatshotIcon from '@mui/icons-material/Whatshot';


export default function ActivityHeatMap() {

    // eslint-disable-next-line no-unused-vars
    const [selected, setSelected] = useState('')

    // TODO: Replace this with actual data
    const data = [
        { date: '2024/01/11', count: 2 },
        { date: '2024/02/12', count: 5 },
        { date: '2024/03/12', count: 5 },
    ];

    const today = new Date();
    // Today formatted. Put a 0 in front of month and day if they are less than 10
    const todayFormatted = `${today.getFullYear()}/${today.getMonth() + 1 < 10 ? '0' : ''}${today.getMonth() + 1}/${today.getDate() < 10 ? '0' : ''}${today.getDate()}`;
    const tasksCompleted = data.find((d) => d.date === todayFormatted)?.count || 0;
    console.log(tasksCompleted);

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
