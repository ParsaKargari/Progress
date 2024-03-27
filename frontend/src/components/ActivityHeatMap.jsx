import React, { useEffect, useState } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import Chip from '@mui/material/Chip';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TasksContext';

export default function ActivityHeatMap() {
    const [selected, setSelected] = useState('');
    const [todaysCount, setTodaysCount] = useState(0);
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const { refreshHeatmapCounter } = useTasks();


    useEffect(() => {
        fetchData();
    }, [refreshHeatmapCounter]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/Tasks/getHeatMapData/${user.id}/2021-01-01/2028-01-01`);
            if (response.ok) {
                const responseData = await response.json();
                // Filter out dates with a count of 0 and map to the desired structure
                const processedData = responseData
                    .map(item => ({
                        date: item.date,
                        count: item.completed // Assuming 'completed' is the number of completed tasks
                    }))
                    .filter(item => item.count > 0); // Only include dates where the count is greater than 0
    
                setData(processedData);
                // Calculate todays count
                const today = new Date().toISOString().slice(0, 10).replaceAll('-', '/');
                const todayData = processedData.find(d => d.date === today) || { date: today, count: 0 };
                console.log('Today:', todayData);
                setTodaysCount(todayData.count);
            } else {
                throw new Error('Failed to heatmap data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log('Data:', data);
    }, [data]);


    const handleCellClick = (date) => {
        setSelected(date);
    };

    return (
        <div>
            <div className='ml-2 mb-4'>
                <Chip
                    label={`${todaysCount} tasks completed today`}
                    icon={<WhatshotIcon />}
                    sx={{
                        color: 'white',
                        backgroundColor: '#00789E',
                        '& .MuiChip-icon': {
                            color: 'white',
                        },
                    }}
                />
            </div>

            <HeatMap
                value={data} // Pass the array directly to the HeatMap component
                weekLabels={['', 'M', '', 'W', '', 'F', '']}
                startDate={new Date('2024/01/01')}
                endDate={new Date('2024/05/19')}
                width={500}
                rectSize={20}
                style={{ height: '210px' }}
                rectRender={(props, data) => {
                    return (
                        <Tooltip content={`${data.date}, Completed: ${data.count || '0'}`} key={props.key}>
                            <rect {...props} key={props.key} onClick={() => handleCellClick(data.date)} />
                        </Tooltip>
                    );
                }}
            />
        </div>
    );
}
