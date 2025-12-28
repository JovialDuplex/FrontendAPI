import "./spinner.css";

export default function Spinner() {

    return (
        <div className="w-100 h-100 bg-light rounded-2 d-flex justify-content-center align-items-center">
            <svg>
                <circle cx={"50%"} cy={"50%"} r={"45%"}></circle>
            </svg>
        </div>
    )
};

