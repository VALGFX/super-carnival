"use client"

interface Props {
    text1:string;
    text2:string;
}

export default function Title({text1, text2}: Props) {
    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "10px"
        }}
        >
            <p style={{
                color:"#1E1E1E",
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "poppins"
            }}>{text1}{' '}
            <span style={{
                color:"#5E5E5E",
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "poppins"
            }}>{text2}</span>
            </p>
            <div style={{
                width: "25px",
                height: "2px",
                backgroundColor: "#1E1E1E"
            }}/>
        </div>
    )
};