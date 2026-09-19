import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();
    // useRef() saves the current value (accessible at previousPath.current) so that even when pathname changes, the value is still accessible
    const previousPath = useRef(pathname);

    useEffect(() => {
        const previousParts = previousPath.current.split("/").filter(Boolean);
        const currentParts = pathname.split("/").filter(Boolean);

        const previousIsMonth = previousParts.length === 2;
        const currentIsMonth = currentParts.length === 2;

        // only scroll when going from/to month/year dashboards
        if (previousIsMonth !== currentIsMonth) {
            window.scrollTo(0, 0);
        }

        previousPath.current = pathname;
    }, [pathname]);

    return null;
}