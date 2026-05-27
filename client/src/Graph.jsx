import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js' 



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Graph({entries}) {

        const options = {};

        const data = {
            labels: entries.map((entry)=> entry.time),
            datasets: [
                {
                    label: "Mood",
                    data: entries.map((entry)=> entry.mood)
                }
            ]
        };

        return <Line options={options} data={data}/>

    }

export default Graph

