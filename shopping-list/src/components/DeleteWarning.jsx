import React from "react";

export default function DeleteWarning(props){
     
    return (
        <div id="delete-msg-cnt">
            <p>Are you sure you want to delete your shopping list?</p>
            <div className="del-btn-cnt">
                <button id="delete-yes" className="msg-btn yes-btn" onClick={props.deleteAllItems}>Yes</button>
                <button id="delete-no" className="msg-btn no-btn" onClick={() => document.getElementById("delete-msg-cnt").style.display = "none"}>No</button>
            </div>
        </div>
    )
}