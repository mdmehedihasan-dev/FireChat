import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
const MsgFriend = () => {
  let [friendList, setFriendList] = useState([]);
  const db = getDatabase();
  let userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    const friendRef = ref(db, "friends/");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().whosendid == userInfo.uid ||
          item.val().whoreceiveid == userInfo.uid
        ) {
          arr.push({ ...item.val(), fid: item.key });
        }
      });
      setFriendList(arr);
    });
  }, []);

  let handleBlock = (item) => {
    if (userInfo.uid == item.whosendid) {
      set(push(ref(db, "block/")), {
        blockbyname: userInfo.displayName,
        blockbyid: userInfo.uid,
        blockid: item.whoreceiveid,
        blockname: item.whoreceivename,
      }).then(() => {
        remove(ref(db, "friends/" + item.fid));
      });
    } else {
      set(push(ref(db, "block/")), {
        blockbyname: userInfo.displayName,
        blockbyid: userInfo.uid,
        blockid: item.whosendid,
        blockname: item.whosendname,
      }).then(() => {
        remove(ref(db, "friends/" + item.fid));
      });
    }
  };

  return (
    <div className="pt-5">
      <div className="p-2 rounded-md h-80 box-container w-small lg:w-box">
        <div className="left-0 z-0 flex items-center justify-between pb-4 bg-white dark:bg-black -top-2">
          <h2 className="font-mono text-2xl">Friends </h2>
        </div>

        <div>
          {friendList.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between mb-4 bg-white dark:bg-black group"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src="../../public/Ellipse 1 (1).png"
                    alt=""
                  />
                </div>
                <div>
                  {item.whoreceiveid == userInfo.uid ? (
                    <h1 className="text-lg font-bold">{item.whosendname}</h1>
                  ) : (
                    <h1 className="text-lg font-bold">{item.whoreceivename}</h1>
                  )}
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleBlock(item)}
                  className="px-2 text-white bg-red-700 rounded-md cursor-pointer"
                >
                  Block
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MsgFriend;
