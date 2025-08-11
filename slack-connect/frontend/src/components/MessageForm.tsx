"use client"

import { useState } from "react"

interface Props {
  onMessageSent: () => void
}

function MessageForm({ onMessageSent }: Props) {
  const [channel, setChannel] = useState("")
  const [text, setText] = useState("")
  const [time, setTime] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const sendMessage = async () => {
    if (!channel || !text) {
      setMessage("Please fill in channel and message fields")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    setIsLoading(true)
    try {
      await fetch("http://localhost:5000/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, text }),
      })

      setMessage("Message sent successfully!")
      setChannel("")
      setText("")
      onMessageSent()
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Failed to send message")
      setTimeout(() => setMessage(""), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const scheduleMessage = async () => {
    if (!channel || !text || !time) {
      setMessage("Please fill in all fields for scheduling")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    setIsLoading(true)
    try {
      await fetch("http://localhost:5000/api/messages/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, text, time }),
      })

      setMessage("Message scheduled successfully!")
      setChannel("")
      setText("")
      setTime("")
      onMessageSent()
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Failed to schedule message")
      setTimeout(() => setMessage(""), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-8 rounded-2xl shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/10 backdrop-blur-md">
      <div className="space-y-6">
        {/* Channel Input */}
        <div className="relative">
          <label
            htmlFor="channel"
            className="block mb-2 text-sm font-medium text-purple-200"
          >
            Channel Name
          </label>
          <input
            id="channel"
            name="channel"
            type="text"
            placeholder="# Channel name (e.g., general)"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="w-full px-4 py-3 bg-purple-900/40 border border-purple-500/40 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
          />
        </div>

        {/* Message Input */}
        <div className="relative">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-blue-200"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="💬 Type your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-blue-900/40 border border-blue-500/40 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 resize-none"
          />
        </div>

        {/* DateTime Input */}
        <div className="relative">
          <label
            htmlFor="scheduleTime"
            className="block mb-2 text-sm font-medium text-pink-200"
          >
            Schedule Time
          </label>
          <input
            id="scheduleTime"
            name="scheduleTime"
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="appearance-none w-full px-4 py-3 bg-pink-900/40 border border-pink-500/40 rounded-lg text-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200 [color-scheme:dark]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-2">📤</span>
            Send Now
          </button>

          <button
            onClick={scheduleMessage}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="mr-2">⏰</span>
            Schedule
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`p-4 rounded-lg text-center font-medium shadow-md ${
              message.includes("success")
                ? "bg-green-500/20 border border-green-500/30 text-green-200"
                : "bg-red-500/20 border border-red-500/30 text-red-200"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageForm
