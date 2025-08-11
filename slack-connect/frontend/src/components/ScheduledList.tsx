"use client"

import { useEffect, useState } from "react"
import { Trash2, Clock, Hash, MessageSquare, Calendar } from "lucide-react"

interface ScheduledMessage {
  channel: string
  text: string
  time: string
}

function ScheduledList() {
  const [messages, setMessages] = useState<ScheduledMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/messages/scheduled")
      const data = await res.json()
      setMessages(data)
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const cancelMessage = async (index: number) => {
    try {
      await fetch(`http://localhost:5000/api/messages/scheduled/${index}`, {
        method: "DELETE",
      })
      fetchMessages()
    } catch (error) {
      console.error("Failed to cancel message:", error)
    }
  }

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-300 text-lg">No scheduled messages</p>
        <p className="text-gray-400 text-sm mt-2">Schedule a message to see it here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              {/* Channel */}
              <div className="flex items-center text-sm">
                <Hash className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-purple-300 font-medium">{msg.channel}</span>
              </div>

              {/* Message */}
              <div className="flex items-start">
                <MessageSquare className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm leading-relaxed">{msg.text}</p>
              </div>

              {/* Scheduled Time */}
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 text-orange-400 mr-2" />
                <span className="text-orange-300">{formatDateTime(msg.time)}</span>
              </div>
            </div>

            {/* Cancel Button */}
            <button
              onClick={() => cancelMessage(idx)}
              className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200 group"
              title="Cancel message"
            >
              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ScheduledList
