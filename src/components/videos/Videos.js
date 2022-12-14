import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";

export default function Videos() {
    const {data} = useGetVideosQuery();
    console.log(data);
    return (
        <>
            <Video />
        </>
    );
}
