import Form from "./Form";

const EditPopup = (props) => {
    return (
        <div className="overlay">
            <div className="popup">
                <Form {...props} />
            </div>
        </div>
    );
};

export default EditPopup;
