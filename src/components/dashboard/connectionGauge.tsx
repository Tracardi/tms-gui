import GaugeComponent from "react-gauge-component";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import {abbreviateNumber} from "../../lib/converters.ts";
import {useTheme} from "@mui/material/styles";
import DashboardPaperCard from "../ui/dashboardPaperCard.tsx";

interface IConnectionGauge {
    label: string,
    rate: number,
    throughput: number,
    maxRate?: number,
}

export default function ConnectionGauge({label, rate, throughput, maxRate}: IConnectionGauge) {

    const {palette} = useTheme()
    const throughputPerSecond = abbreviateNumber(throughput) + "B/s"
    const arc = {
        subArcs: [
            {
                limit: 1000,
                color: palette.success.main,
                showTick: true
            },
            {
                limit: 9000,
                color: palette.warning.main,
                showTick: true
            },
            {
                limit: 10000,
                color: palette.error.main,
                showTick: true
            }
        ]
    }

    return (
        <DashboardPaperCard sx={{padding: "0.6rem 0", minWidth: "300px"}}>
            <Stack alignItems={"center"}>
                <Typography variant={"subtitle1"}>{label}</Typography>
                <GaugeComponent value={rate} maxValue={maxRate} arc={arc} labels={{
                    valueLabel: {formatTextValue: (value) => abbreviateNumber(value)}
                }}/>
                <Typography>Throughput: {throughputPerSecond}</Typography>
            </Stack>
        </DashboardPaperCard>

    )
}
