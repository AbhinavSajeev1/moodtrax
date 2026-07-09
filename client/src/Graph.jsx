import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js' 


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Graph({entries}) {

        const options = {
                plugins: {
                    legend: {
                        position: "top",
                        align: 'center',
                        labels: {
                            color: 'skyblue'
                        }
                    }
                },
                layout: {
                    padding: {
                        left: 0, 
                        right: 0
                    }
                },
            scales: {
                x: {
                    ticks: {
                        color: 'black'
                    }
                },
                y: {
                    ticks: {
                        color: 'skyblue'
                    },
                    afterFit: (scaleInstance) => {
                        scaleInstance.paddingRight = 100; }
                }
            }
        };

        const data = {
            labels: entries.map((entry)=> entry.time),
            datasets: [
                {
                    label: "Mood",
                    data: entries.map((entry)=> entry.mood),
                    backgroundColor: [ 'skyblue' ],
                    borderColor: ['skyblue']
                }
            ],
        };

        return <Line options={options} data={data}/>

    }

export default Graph

