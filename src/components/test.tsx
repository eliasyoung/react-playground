import { getRouteApi } from "@tanstack/react-router"

const route = getRouteApi('/')
export const TestApp = () => {
    const loaderData = route.useLoaderData()

    console.log(loaderData)

    return <div className="text-3xl">123</div>
}