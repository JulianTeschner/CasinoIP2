import PublicRoutes from "./public.routes";
import { Layout } from "antd";

export default function PublicLayout() {
    return (
        <Layout>
            <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                <div style={{ flexGrow: 1 }}>
                    <Layout.Content>
                        <PublicRoutes />
                    </Layout.Content>
                </div>
            </div>
        </Layout>
    );
}