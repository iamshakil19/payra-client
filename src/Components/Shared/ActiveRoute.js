import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function ActiveRoute({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link
                style={{color: match ? "#FE3C47" : "black"}}
                to={to}
                {...props}
            >
                {children}
            </Link>
        </div>
    );
}

export default ActiveRoute;