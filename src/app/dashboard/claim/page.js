import { Space } from "antd";
import Cards from "./Card/page";

export default function Claim() {
    const content = {

    }
    return (
        <div style={content}>
            {[1, 2, 3, 4, 5].map(i => {
                return (
                    <>
                        <Cards />
                    </>
                )
            })}
            <Cards />
        </div>
    )
}
