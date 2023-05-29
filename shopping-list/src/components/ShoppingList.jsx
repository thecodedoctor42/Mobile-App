import React from "react";

export default function ShoppingList(props){
    
    const listItemsHtml = getListItemsHtml()
    
    function getListItemsHtml() {
        const items = props.itemsArray
        return items.map((item, index) => 
            <div key={item.id} className="list-item" onMouseOver={() => props.changeItemPass(item.id)} onTouchStart={() => props.changeItemPass(item.id)} {...props.handleLongPress}>
                <div className="item-info">
                    <span>{item.amount}</span>
                    <span>x</span>
                    <label className="item-info-label" htmlFor={`item${index}`}>{item.name}</label>
                </div>
                <input className="item-cb" id={`item${index}`} name={`item${index}`} value={item.name} type="checkbox"></input>
            </div>
        )
    }
    
    return (
        <form className="shopping-list">
            <h2 className="list-title">Shopping list:</h2>
            {listItemsHtml}
        </form>
    )
}