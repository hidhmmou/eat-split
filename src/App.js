import React, { useState } from "react";

export default function App() {
    const [friends, setFriends] = useState(() => {
        const storedFriends = localStorage.getItem("friends");
        return storedFriends ? JSON.parse(storedFriends) : [];
    });
    const [displayedFriend, setDisplayedFriend] = useState(1);
    const [updateApp, setUpdateApp] = useState("");
    const [displaySplit, setDisplaySplit] = useState(false);

    localStorage.setItem("friends", JSON.stringify(friends));
    return (
        <div
            className={`app test ${
                friends.length === 0 ? "no-friends-app" : ""
            } ${!displaySplit ? "app-without-split" : ""}`}
        >
            <div className="sidebar">
                {friends.length > 0 && (
                    <FriendsList
                        friends={friends}
                        setDisplayedFriend={setDisplayedFriend}
                        setDisplaySplit={setDisplaySplit}
                        displaySplit={displaySplit}
                        displayed={friends.find(
                            (friend) => friend.id === displayedFriend
                        )}
                        setUpdateApp={setUpdateApp}
                    />
                )}
                <AddFriend friends={friends} setFriends={setFriends} />
            </div>
            {friends.length > 0 && displaySplit && (
                <FormSplitBill
                    friends={friends}
                    setFriends={setFriends}
                    displayed={friends.find(
                        (friend) => friend.id === displayedFriend
                    )}
                    setUpdateApp={setUpdateApp}
                    updateApp={updateApp}
                    setDisplayedFriend={setDisplayedFriend}
                    setDisplaySplit={setDisplaySplit}
                />
            )}
        </div>
    );
}

function FriendsList({
    friends,
    setDisplayedFriend,
    setDisplaySplit,
    displaySplit,
    displayed,
    setUpdateApp,
}) {
    const [openedId, setOpnedId] = useState(-1);
    const [oldSelected, setOldSelected] = useState(null);
    return (
        friends.length && (
            <ul>
                {friends.map((friend) => (
                    <Friend
                        displaySplit={displaySplit}
                        friend={friend}
                        key={friend.id}
                        setDisplayedFriend={setDisplayedFriend}
                        setDisplaySplit={setDisplaySplit}
                        displayed={displayed}
                        openedId={openedId}
                        setOpnedId={setOpnedId}
                        setUpdateApp={setUpdateApp}
                        oldSelected={oldSelected}
                        setOldSelected={setOldSelected}
                    />
                ))}
            </ul>
        )
    );
}

function Friend({
    friend,
    setDisplayedFriend,
    setDisplaySplit,
    displaySplit,
    displayed,
    openedId,
    setOpnedId,
    setUpdateApp,
    oldSelected,
    setOldSelected,
}) {
    const [open, setOpen] = useState(false);
    function SelectFriend(e) {
        setOpen(!open);
        if (open) setOpnedId(displayed.id);
        setDisplayedFriend(friend.id);
        if ((displaySplit && displayed.id === friend.id) || !displaySplit) {
            setDisplaySplit(!displaySplit);
        }
        if (e.target.textContent == "Select") {
            setOldSelected(e);
            if (oldSelected) {
                oldSelected.target.textContent = "Select";
            }
            e.target.textContent = "Close";
        } else e.target.textContent = "Select";
    }
    return (
        <li>
            <img src={friend.image} alt={friend.name}></img>
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
                <p className="red">
                    You owe {friend.name} {Math.abs(friend.balance)}$
                </p>
            )}

            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} owes you {Math.abs(friend.balance)}$
                </p>
            )}

            {friend.balance === 0 && <p>you and {friend.name} are even</p>}
            <button className="button" onClick={(e) => SelectFriend(e)}>
                Select
            </button>
        </li>
    );
}

function AddFriend({ friends, setFriends }) {
    const [friendName, setFriendName] = useState("");
    const [img, setImg] = useState("");
    const [imgWarning, setImgWarning] = useState("");
    const [nameWarning, setNameWarning] = useState("");
    const [hasImg, sethasImg] = useState(false);

    function AddFriend(e) {
        e.preventDefault();
        if (friendName === "" || (hasImg && img === "")) {
            setNameWarning("empty field");
            return;
        }
        const tmp = "https://i.pravatar.cc/48?u=" + Date.now();
        const newFriend = {
            id: Date.now(),
            name: friendName,
            image: !hasImg ? tmp : img,
            balance: 0,
        };
        setFriends([...friends, newFriend]);
        setFriendName("");
        setImg("");
    }

    function handleFriendName(input) {
        const namePattern = /^[a-zA-Z' -]+$/;

        if (!input.match(namePattern)) setNameWarning("invalid name");
        else {
            setNameWarning("");
            setFriendName(input);
        }
        if (input === "") setFriendName(input);
    }

    function handleImage(input) {
        const urlPattern =
            /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;

        if (!input.match(urlPattern)) setImgWarning("invalid img url");
        else setImgWarning("");

        setImg(input);
    }

    function handleCheck() {
        sethasImg(!hasImg);
        hasImg && setImgWarning("");
        setImg("");
    }

    return (
        <form
            className={`form-add-friend ${
                friends.length === 0 ? "no-friends" : ""
            }`}
            onSubmit={(e) => AddFriend(e)}
        >
            <label>👫Friend name</label>
            <input
                type="text"
                value={friendName}
                onChange={(e) => handleFriendName(e.target.value)}
            />

            <div>Add image</div>
            <input
                className="custom-checkbox"
                type="checkbox"
                value={hasImg}
                onChange={() => handleCheck()}
            />

            {hasImg && (
                <React.Fragment>
                    <label>🖼️Image URL</label>
                    <input
                        type="text"
                        value={img}
                        onChange={(e) => handleImage(e.target.value)}
                    />
                </React.Fragment>
            )}

            <div className="warning">{nameWarning || imgWarning}</div>
            <button
                className={`button ${
                    nameWarning + imgWarning !== "" ? "disabled-button" : ""
                }`}
                disabled={nameWarning + imgWarning !== ""}
            >
                Add friend
            </button>
        </form>
    );
}

function FormSplitBill({
    displayed,
    setUpdateApp,
    friends,
    setFriends,
    setDisplayedFriend,
    setDisplaySplit,
}) {
    const [ammount, setAmmount] = useState("");
    const [myExpense, setMyExpense] = useState("");
    const [userExpense, setUserExpense] = useState("");
    const [whoPaid, setWhoPaid] = useState("");
    const [moneyLeak, setMoneyLeak] = useState("");

    function updateBalance(e) {
        e.preventDefault();
        if (+userExpense + +myExpense !== +ammount) {
            setMoneyLeak("You can't submit there is a money leak !");
            setTimeout(() => setMoneyLeak(""), 2000);
        } else if (userExpense === "" || myExpense === "" || ammount === "") {
            setMoneyLeak("You can't submit empty field !");
            setTimeout(() => setMoneyLeak(""), 2000);
        } else {
            setMoneyLeak("");
            setUserExpense("");
            setMyExpense("");
            setAmmount("");

            if (whoPaid === "friend") {
                displayed.balance += +myExpense;
            } else {
                displayed.balance -= +userExpense;
            }
            setUpdateApp(Date.now());
        }
    }

    function handleBillAmmount(input) {
        const isNumber = /^\d+$/;

        if (input.match(isNumber) || input === "") setAmmount(input);
        else {
            setMoneyLeak("Invalid input !");
            setTimeout(() => setMoneyLeak(""), 2000);
        }
    }

    function handleExpense(input) {
        const isNumber = /^\d+$/;

        if ((input.match(isNumber) || input === "") && +ammount >= +input) {
            setMyExpense(input);
            setUserExpense(ammount - input);
        } else {
            setMoneyLeak("Invalid input !");
            setTimeout(() => setMoneyLeak(""), 2000);
        }
    }

    function handleUserExpense(input) {
        const isNumber = /^\d+$/;

        if (input.match(isNumber) || input === "") setUserExpense(input);
        else {
            setMoneyLeak("Invalid input !");
            setTimeout(() => setMoneyLeak(""), 2000);
        }
    }

    function removeFriend(e) {
        // remove the id
        setFriends(friends.filter((friend) => friend.id !== displayed.id));
        setDisplaySplit(false);
    }

    return (
        <form className="form-split-bill" onSubmit={(e) => e.preventDefault()}>
            <h2>Split a bill with {displayed.name}</h2>

            <label>💰Bill value</label>
            <input
                type="text"
                value={ammount}
                onChange={(e) => handleBillAmmount(e.target.value)}
            />

            <label>🧍‍♀️Your expense</label>
            <input
                type="text"
                value={myExpense}
                onChange={(e) => handleExpense(e.target.value)}
            />

            <label>👫{displayed.name}'s expense</label>
            <input
                type="text"
                value={userExpense}
                disabled="true"
                onChange={(e) => handleUserExpense(e.target.value)}
            />

            <label>🤑Who is paying the bill</label>
            <select
                value={whoPaid}
                onChange={(e) => setWhoPaid(e.target.value)}
            >
                <option value="user">You</option>
                <option value="friend">{displayed.name}</option>
            </select>

            <div className="warning">{moneyLeak}</div>
            <button className="button" onClick={(e) => updateBalance(e)}>
                Split bill
            </button>
            <button className="button-delete" onClick={() => removeFriend()}>
                Remove {displayed.name}
            </button>
        </form>
    );
}
