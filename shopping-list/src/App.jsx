import React from "react";
import { useCallback, useRef } from "react";
import logo from "./assets/logo.png"
import { database, itemsInDB } from "../firebase"
import { onSnapshot,
  addDoc, 
  doc, 
  deleteDoc
} from "firebase/firestore"
import ShoppingList from "./components/ShoppingList";
import DeleteWarning from "./components/DeleteWarning";

export default function App(){

  const [itemsArray, setItemsArray] = React.useState([])
  const [itemPass, setItemPass] = React.useState("")

  React.useEffect(() => {
    const syncWithFirestore = onSnapshot(itemsInDB, function(snapshot) {
      const itemsArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setItemsArray(itemsArr)
    })
    return syncWithFirestore
  }, [])

  function saveToCart(){
    const itemNameEl = document.getElementById("input-name")
    const itemAmountEl = document.getElementById("input-amount")
    if (itemNameEl.value && itemAmountEl.value){
      const newItem = {name: itemNameEl.value, amount: itemAmountEl.value}
      setItemsArray(prevState => [...prevState, newItem])
      addDoc(itemsInDB, newItem)
      resetFields(itemNameEl, itemAmountEl)
    }
  }

  function resetFields(nameEl, amountEl){
    nameEl.value = ""
    amountEl.value = ""
  }

  function changeItemPass(itemId){
    setItemPass(itemId)
  }  

  function deleteItem(itemId){
    const docRef = doc(database, "items", itemId)
    deleteDoc(docRef)
  }

  function deleteAllItems(){
    document.getElementById("delete-msg-cnt").style.display = "none"
    itemsArray.forEach((item) => {
      const docRef = doc(database, "items", item.id)
      deleteDoc(docRef)
    })
  }

  function handleDeleteList(){
    const deleteMsgEl = document.getElementById("delete-msg-cnt")
    itemsArray.length > 0 ? deleteMsgEl.style.display = "block" : ""
  }

  const onLongPress = () => {
    deleteItem(itemPass)
  };

  const onClick = () => {
  }

  const defaultOptions = {
      shouldPreventDefault: true,
      delay: 1000,
  };

  const handleLongPress = useLongPress(onLongPress, onClick, defaultOptions)

  function useLongPress(
    onLongPress,
    onClick,
    { shouldPreventDefault = true, delay = 300 } = {}
    ) {
          
    const [longPressTriggered, setLongPressTriggered] = React.useState(false);
    const timeout = useRef();
    const target = useRef();

    const start = useCallback(
        event => {
            if (shouldPreventDefault && event.target) {
                    event.target.addEventListener("touchend", preventDefault, {
                    passive: false
                });
                target.current = event.target;
            }
            timeout.current = setTimeout(() => {
                onLongPress(event);
                setLongPressTriggered(true);
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault]
    );

    const clear = useCallback(
        (event, shouldTriggerClick = true) => {
            timeout.current && clearTimeout(timeout.current);
            shouldTriggerClick && !longPressTriggered && onClick();
            setLongPressTriggered(false);
            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener("touchend", preventDefault);
            }
        },
        [shouldPreventDefault, onClick, longPressTriggered]
    );

    return {
        onMouseDown: e => start(e),
        onTouchStart: e => start(e),
        onMouseUp: e => clear(e),
        onMouseLeave: e => clear(e, false),
        onTouchEnd: e => clear(e)
    };
  };

  const isTouchEvent = event => {
  return "touches" in event;
  };

  const preventDefault = event => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
      event.preventDefault();
  }
  };

  return (
    <div className="cnt">
      <img className="logo" src={logo}/>
      <input className="input-text input-name" type="text" id="input-name" placeholder="Bread"/>
      <div className="submit-cnt">
        <input className="input-text submit-item" type="number" id="input-amount" placeholder="1"/>
        <button id="add-button" className="submit-item" onClick={saveToCart}>Add</button>
      </div>
      {itemsArray.length > 0 && <ShoppingList itemsArray={itemsArray} handleLongPress={handleLongPress} changeItemPass={changeItemPass}/>}
      <button id="delete-btn" onClick={handleDeleteList} className="delete-btn">Delete list</button>
      {<DeleteWarning deleteAllItems={deleteAllItems}/>}
    </div>
  )
}