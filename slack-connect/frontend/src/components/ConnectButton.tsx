"use client"

import { useState } from "react"
import { Slack, CheckCircle, Loader2, AlertCircle } from "lucide-react"

interface Props {
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
}

function ConnectButton({ isConnected, setIsConnected }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleConnect = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const res = await fetch("http://localhost:5000/api/auth/connect")
      const data = await res.json()

      setMessage(data.status)
      setIsConnected(true)

      // Auto-hide success message after 3 seconds
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Connection failed. Please try again.")
      setIsConnected(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="text-center">
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className={`
          relative inline-flex items-center px-8 py-4 rounded-2xl font-semibold text-lg
          transition-all duration-300 transform hover:scale-105 active:scale-95
          shadow-2xl hover:shadow-purple-500/25
          ${
            isConnected
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
          }
          ${isLoading ? "cursor-not-allowed opacity-75" : "cursor-pointer"}
        `}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 mr-3 animate-spin" />
            Connecting...
          </>
        ) : isConnected ? (
          <>
            <CheckCircle className="w-6 h-6 mr-3" />
            Connected to Slack
          </>
        ) : (
          <>
            <Slack className="w-6 h-6 mr-3" />
            Connect to Slack
          </>
        )}
      </button>

      {/* Status Message */}
      {message && (
        <div
          className={`
          mt-4 p-4 rounded-xl flex items-center justify-center max-w-md mx-auto
          ${
            message.includes("failed") || message.includes("error")
              ? "bg-red-500/20 border border-red-500/30 text-red-200"
              : "bg-green-500/20 border border-green-500/30 text-green-200"
          }
        `}
        >
          {message.includes("failed") || message.includes("error") ? (
            <AlertCircle className="w-5 h-5 mr-2" />
          ) : (
            <CheckCircle className="w-5 h-5 mr-2" />
          )}
          {message}
        </div>
      )}
    </div>
  )
}

export default ConnectButton
