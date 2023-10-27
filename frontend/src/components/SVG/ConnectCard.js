import React from "react";

const ConnectCard = (props) => {
    return (
        <div className="icon_group">
            <svg width="3.5em" height="3.5em" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
                <g clipPath="url(#ConnectCard_svg__clip0)" fill="rgb(226, 232, 240)">
                    <path d="M39.86 30.062a9.002 9.002 0 00-6.64 2.998L21.45 26.87a9.928 9.928 0 00.42-2.804 10.495 10.495 0 00-20.34-3.67 10.493 10.493 0 0017.85 10.417l11.755 6.19a8.437 8.437 0 00-.27 2.055 8.996 8.996 0 0015.355 6.36 8.996 8.996 0 00-6.36-15.355zM41.36.079a7.487 7.487 0 00-5.3 2.196 7.487 7.487 0 00-2.196 5.3 6.52 6.52 0 00.18 1.499l-8.815 4.903c-1.034.576-1.304 1.935-.73 2.97.575 1.038 1.876 1.53 2.913.953l8.805-4.898a7.391 7.391 0 005.143 2.068 7.493 7.493 0 006.49-3.748 7.492 7.492 0 000-7.495A7.493 7.493 0 0041.36.079z" />
                </g>
                <defs>
                    <clipPath id="ConnectCard_svg__clip0">
                    <path fill="none" transform="translate(.883 .079)" d="M0 0h47.973v47.973H0z" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}

export default ConnectCard