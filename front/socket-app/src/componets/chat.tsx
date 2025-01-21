import React, { useEffect, useState, useCallback } from "react";
import socketIOClient, { Socket } from "socket.io-client";

export default function Chat() {
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<string[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // ソケット接続の初期化
    const newSocket = socketIOClient("http://localhost:5000");
    setSocket(newSocket);

    // コンポーネントのアンマウント時にソケットを切断
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // 接続成功時のイベント
    socket.on("connect", () => {
      console.log("Socket 接続成功");
    });

    // メッセージ受信時のイベント
    socket.on("message", (data: string) => {
      console.log("メッセージを受信:", data);
      setMessageList((prev) => [...prev, data]);
    });

    // ユーザー数更新時のイベント
    socket.on("count", (count: number) => {
      console.log("接続ユーザー数:", count);
      setUserCount(count);
    });

    // 切断時のイベント
    socket.on("disconnect", () => {
      console.log("Socket 接続終了");
    });
  }, [socket]);

  const onSubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      if (socket && name && message) {
        const messageData = `${name}: ${message}`;
        socket.emit("message", messageData);
        setMessageList((prev) => [...prev, messageData]); // 自分のメッセージをすぐに表示
        setMessage("");
      }
    },
    [socket, name, message]
  );

  return (
    <div className="p-4">
      <div className="mb-4">
        <p>接続ユーザー数: {userCount}</p>
      </div>

      <div className="mb-4 max-h-[400px] overflow-y-auto">
        {messageList.length === 0 ? (
          <p>メッセージはありません</p>
        ) : (
          <div className="space-y-2">
            {messageList.map((msg, index) => (
              <p key={index} className="p-2 bg-gray-100 rounded">
                {msg}
              </p>
            ))}
          </div>
        )}
      </div>

      <form className="flex gap-3" onSubmit={onSubmit}>
        <input
          type="text"
          className="w-1/5 border border-black rounded-md p-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="名前"
          required
        />
        <input
          type="text"
          className="w-1/3 border border-black rounded-md p-2"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="メッセージ"
          required
        />
        <button
          type="submit"
          className="w-20 h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={!name || !message}
        >
          送信
        </button>
      </form>
    </div>
  );
}
