"use client"

import { useState } from "react"
import ConnectButton from "./components/ConnectButton"
import MessageForm from "./components/MessageForm"
import ScheduledList from "./components/ScheduledList"

function App() {
  const [isConnected, setIsConnected] = useState(false)

  const refreshList = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-2xl">
              <div className="w-12 h-12 text-white text-2xl font-bold flex items-center justify-center">S</div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Slack Connect
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Schedule and manage your Slack messages with ease. Connect, compose, and control your communication
            workflow.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Connection Status */}
          <div className="mb-8">
            <ConnectButton isConnected={isConnected} setIsConnected={setIsConnected} />
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Message Form Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-xl mr-4">
                  <div className="w-6 h-6 text-white text-sm font-bold flex items-center justify-center">✉</div>
                </div>
                <h2 className="text-2xl font-bold text-white">Compose Message</h2>
              </div>
              <MessageForm onMessageSent={refreshList} />
            </div>

            {/* Scheduled Messages Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 p-3 rounded-xl mr-4">
                  <div className="w-6 h-6 text-white text-sm font-bold flex items-center justify-center">⏰</div>
                </div>
                <h2 className="text-2xl font-bold text-white">Scheduled Messages</h2>
              </div>
              <ScheduledList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
