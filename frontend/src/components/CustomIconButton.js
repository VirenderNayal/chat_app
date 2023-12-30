import React from 'react'

function CustomIconButton({ icon, text }) {
    return (
        <div>
            <div className='d-flex align-items-center justify-content-center'>
                <div className='d-flex position-absolute' style={{ height: "100px", width: "100px", backgroundColor: "rgba(0, 132, 255, 0.2)", borderRadius: "50px" }}>
                </div>
                <div className='d-flex position-absolute' style={{ height: "85px", width: "85px", backgroundColor: "rgba(0, 132, 255, 0.5)", borderRadius: "50px" }}>
                </div>
                <span className="material-symbols-outlined" style={{ color: "white", zIndex: "100", fontSize: "40px" }}>
                    {icon}
                </span>
            </div>
            <div className='mt-4 pt-2 text-white' style={{fontWeight: "500", fontSize: "20px"}}>{text}</div>
        </div>
    )
}

export default CustomIconButton