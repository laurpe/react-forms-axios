import Form from "./Form";

const EditPopup = (props) => {
    console.log("editpopup props", props);
    return (
        <div className="overlay">
            <div className="popup">
                <Form {...props} />
            </div>
        </div>
    );
};

export default EditPopup;
