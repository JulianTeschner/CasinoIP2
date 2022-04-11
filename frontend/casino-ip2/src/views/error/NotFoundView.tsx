import { Button, Result } from "antd";
import { useLocation } from "react-router-dom";

export default function NotFound() {
    const location = useLocation();

    return (
        <div>
            <Result
                status="404"
                title="404 - Not Found"
                subTitle={`Sorry, the page "${location.pathname}" you tried visiting does not exist.`}
                extra={
                    <Button type="primary" size="large" href="/">
                        Back Home
                    </Button>
                }
            />
        </div>
    );
}