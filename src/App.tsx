import { useState } from 'react'
import { PortfolioProvider, usePortfolio } from './lib/PortfolioContext'
import { ThemeProvider } from './lib/ThemeContext'
import { LanguageProvider } from './i18n/LanguageContext'
import StatusBar from './components/layout/StatusBar'
import SceneSwitcher from './components/layout/SceneSwitcher'
import SceneStage from './components/layout/SceneStage'
import ProfileScene from './components/scenes/ProfileScene'
import TimelineScene from './components/scenes/TimelineScene'
import FactoryScene from './components/scenes/FactoryScene'
import LiveChatPanel from './components/feedback/LiveChatPanel'
import ConciergeMascot from './components/mascot/ConciergeMascot'
import DeepSeaSection from './components/deepsea/DeepSeaSection'

function AppShell() {
  const { setDepth } = usePortfolio()
  const [chatCollapsed, setChatCollapsed] = useState(false)

  return (
    <div className="flex h-screen flex-col bg-rig-bg">
      <StatusBar />
      <div className="flex flex-1 overflow-hidden">
        <SceneSwitcher />
        <div data-scroll-root className="relative flex-1 overflow-y-auto">
          <div className="h-full">
            <SceneStage
              scenes={{
                profile: <ProfileScene />,
                timeline: <TimelineScene />,
                factory: <FactoryScene />,
              }}
            />
          </div>
          <DeepSeaSection onDepthChange={setDepth} />
        </div>
        {!chatCollapsed && <LiveChatPanel collapsed={false} onToggle={() => setChatCollapsed(true)} />}
      </div>
      {chatCollapsed && <LiveChatPanel collapsed onToggle={() => setChatCollapsed(false)} />}
      <ConciergeMascot />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioProvider>
          <AppShell />
        </PortfolioProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
