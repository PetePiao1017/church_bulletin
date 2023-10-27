import React from "react";

const Video = (props) => {
    return (
        <div className="icon_group">
            <svg width="3.5em" height="3.5em" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
                <path
                    d="M22 0C9.85 0 0 9.85 0 22s9.85 22 22 22 22-9.85 22-22S34.15 0 22 0zm10.538 23.696L16.536 33.697a1.996 1.996 0 01-2.03.054A2 2 0 0113.475 32l.002-20.003a2.001 2.001 0 013.06-1.696l16.002 10a2.001 2.001 0 01-.002 3.393v.001z"
                    fill="rgb(226, 232, 240)"
                />
            </svg>
        </div>
    )
}

export default Video