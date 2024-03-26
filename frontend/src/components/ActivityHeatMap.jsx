import React, { useEffect, useState } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import Chip from '@mui/material/Chip';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useAuth } from '../context/AuthContext';

export default function ActivityHeatMap() {
    const [selected, setSelected] = useState('');
    const { user } = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:9000/Tasks/getHeatMapData/${user.id}/2021-01-01/2028-01-01`);
            const responseData = await response.json();
            console.log('Response data:', responseData);
            setData(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log('Data:', data);
    }, [data]);

    if (!data.length) {
        return <div>Loading...</div>;
    }

    const today = new Date().toISOString().slice(0, 10).replaceAll('-', '/');
    const todayData = data.find(d => d.date === today) || { date: today, count: 0, completed: 0 };

    const handleCellClick = (date) => {
        setSelected(date);
    };

    return (
        <div>
            <div className='ml-2 mb-4'>
                <Chip
                    label={`${todayData.completed} tasks completed today`}
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
                        <Tooltip content={`${data.date}, Count: ${data.count} ,Completed: ${data.completed || '0'}`} key={props.key}>
                            <rect {...props} key={props.key} onClick={() => handleCellClick(data.date)} />
                        </Tooltip>
                    );
                }}
            />
        </div>
    );
}
