import DashboardList from "../dashboardList.tsx";

type ListData = {
    [key: string]: string | number | boolean
}

interface IEsClusterList {
    data: ListData
}

export default function ElasticsearchClusterList({data}: IEsClusterList) {

    return (
        <DashboardList sx={{
            width: "100%",
            flex: "1 0 0",
            padding: "1rem 2rem",
            overflow: "scroll"
        }} data={data} title="Elasticsearch Info"/>
    )
}
