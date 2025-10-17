"use client";

import { useEffect } from "react";

export const AdBanner = ({ id }: { id: string }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `//www.highperformanceformat.com/${id}/invoke.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [id]);

    return (
        <div
            id={id}
            style={{
                display: "inline-block",
                width: "100%",
                textAlign: "center",
                margin: "0 auto",
                backgroundColor: "red"
            }}
        />
    );
};
