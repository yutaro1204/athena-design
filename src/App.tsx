import './App.css'

// Page 0001: TCG Landing Page
function Page0001() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#e0e0e0] font-sans">
      {/* Header/Navigation */}
      <header className="bg-[#16213e] border-b-2 border-[#0f3460] px-12 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#e94560]">
          TCG LOGO
        </div>
        <nav className="flex gap-8">
          <a href="#shop" className="text-[#e0e0e0] no-underline hover:text-[#e94560] transition-colors">Shop</a>
          <a href="#about" className="text-[#e0e0e0] no-underline hover:text-[#e94560] transition-colors">About</a>
          <a href="#login" className="text-[#e0e0e0] no-underline hover:text-[#e94560] transition-colors">Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-[#0f3460] border-2 border-[#e94560] px-24 py-20 flex gap-16 items-center">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Epic Card Battles<br />Await
          </h1>
          <p className="text-lg text-[#a0a0a0] mb-10">
            Build your deck, master the game,<br />
            and dominate the battlefield.
          </p>
          <div className="flex gap-6">
            <button className="bg-[#e94560] text-white border-2 border-[#e94560] rounded-md px-10 py-3.5 text-base font-bold cursor-pointer hover:bg-[#d63850] transition-colors">
              Start Playing
            </button>
            <button className="bg-transparent text-[#e0e0e0] border-2 border-[#e0e0e0] rounded-md px-10 py-3.5 text-base font-bold cursor-pointer hover:bg-[#e0e0e0] hover:text-[#0f3460] transition-colors">
              Watch Trailer
            </button>
          </div>
        </div>
        <div className="flex-1 bg-[#16213e] border-2 border-[#4a5568] rounded-lg h-[340px] flex items-center justify-center text-[#666]">
          [Hero Image/<br />Card Animation]
        </div>
      </section>

      {/* Features Section */}
      <section className="px-24 py-16 bg-[#1a1a2e] border-2 border-[#0f3460]">
        <h2 className="text-4xl font-bold text-center mb-2">
          Game Features
        </h2>
        <div className="w-60 h-0.5 bg-[#e94560] mx-auto mb-12" />
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-10 text-center">
            <div className="w-[70px] h-[70px] border-2 border-[#e94560] rounded-full mx-auto mb-8 flex items-center justify-center text-2xl">
              ⚔
            </div>
            <h3 className="text-xl font-bold mb-4">
              Strategic Combat
            </h3>
            <p className="text-sm text-[#a0a0a0]">
              Master complex mechanics<br />and outsmart opponents
            </p>
          </div>
          <div className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-10 text-center">
            <div className="w-[70px] h-[70px] border-2 border-[#e94560] rounded-full mx-auto mb-8 flex items-center justify-center text-2xl">
              🎨
            </div>
            <h3 className="text-xl font-bold mb-4">
              Stunning Art
            </h3>
            <p className="text-sm text-[#a0a0a0]">
              Collect beautifully designed<br />cards and rare editions
            </p>
          </div>
          <div className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-10 text-center">
            <div className="w-[70px] h-[70px] border-2 border-[#e94560] rounded-full mx-auto mb-8 flex items-center justify-center text-2xl">
              🌐
            </div>
            <h3 className="text-xl font-bold mb-4">
              Global Ranked
            </h3>
            <p className="text-sm text-[#a0a0a0]">
              Compete with players<br />worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Available Packs Section */}
      <section className="px-24 py-16 bg-[#0f3460] border-2 border-[#16213e]">
        <h2 className="text-4xl font-bold text-center mb-2">
          Available Now
        </h2>
        <div className="w-[300px] h-0.5 bg-[#e94560] mx-auto mb-12" />
        <div className="flex gap-8 justify-center items-center">
          <div className="bg-[#16213e] border-2 border-[#e94560] rounded-lg p-5 w-[250px] text-center">
            <div className="bg-[#1a1a2e] border border-[#4a5568] h-[150px] mb-4 flex items-center justify-center text-[#666] text-sm">
              [Pack Image]
            </div>
            <h3 className="text-lg font-bold mb-2">
              Starter Pack
            </h3>
            <p className="text-base text-[#e94560] font-bold">
              $9.99
            </p>
          </div>
          <div className="bg-[#16213e] border-2 border-[#e94560] rounded-lg p-5 w-[250px] text-center">
            <div className="bg-[#1a1a2e] border border-[#4a5568] h-[150px] mb-4 flex items-center justify-center text-[#666] text-sm">
              [Pack Image]
            </div>
            <h3 className="text-lg font-bold mb-2">
              Legends Pack
            </h3>
            <p className="text-base text-[#e94560] font-bold">
              $24.99
            </p>
          </div>
          <div className="bg-[#16213e] border-2 border-[#e94560] rounded-lg p-5 w-[250px] text-center">
            <div className="bg-[#1a1a2e] border border-[#4a5568] h-[150px] mb-4 flex items-center justify-center text-[#666] text-sm">
              [Pack Image]
            </div>
            <h3 className="text-lg font-bold mb-2">
              Premium Pack
            </h3>
            <p className="text-base text-[#e94560] font-bold">
              $49.99
            </p>
          </div>
          <div className="border border-dashed border-[#4a5568] rounded-lg w-[100px] h-[250px] flex items-center justify-center text-[#666] text-2xl">
            →
          </div>
        </div>
      </section>

      {/* Upcoming Releases Section */}
      <section className="px-24 py-16 bg-[#1a1a2e] border-2 border-[#0f3460]">
        <h2 className="text-4xl font-bold text-center mb-2">
          Upcoming Releases
        </h2>
        <div className="w-[340px] h-0.5 bg-[#e94560] mx-auto mb-12" />
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-[#1a1a2e] border border-[#4a5568] w-20 h-20 flex items-center justify-center text-[#666] text-xs flex-shrink-0">
                [Image]
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  Shadow Realm
                </h3>
                <p className="text-sm text-[#e94560] mb-2">
                  March 15, 2026
                </p>
                <p className="text-[13px] text-[#a0a0a0]">
                  New dark-themed expansion<br />with 150+ cards
                </p>
              </div>
            </div>
            <button className="bg-transparent text-[#e94560] border-2 border-[#e94560] rounded px-6 py-2 text-[13px] cursor-pointer w-[120px] hover:bg-[#e94560] hover:text-white transition-colors">
              Pre-order
            </button>
          </div>
          <div className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-[#1a1a2e] border border-[#4a5568] w-20 h-20 flex items-center justify-center text-[#666] text-xs flex-shrink-0">
                [Image]
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  Crystal Warriors
                </h3>
                <p className="text-sm text-[#e94560] mb-2">
                  April 22, 2026
                </p>
                <p className="text-[13px] text-[#a0a0a0]">
                  Legendary heroes return<br />with powerful abilities
                </p>
              </div>
            </div>
            <button className="bg-transparent text-[#e94560] border-2 border-[#e94560] rounded px-6 py-2 text-[13px] cursor-pointer w-[120px] hover:bg-[#e94560] hover:text-white transition-colors">
              Notify Me
            </button>
          </div>
          <div className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-6">
            <div className="flex gap-4 mb-4">
              <div className="bg-[#1a1a2e] border border-[#4a5568] w-20 h-20 flex items-center justify-center text-[#666] text-xs flex-shrink-0">
                [Image]
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">
                  Cyber Age
                </h3>
                <p className="text-sm text-[#e94560] mb-2">
                  May 10, 2026
                </p>
                <p className="text-[13px] text-[#a0a0a0]">
                  Futuristic tech-themed<br />cards and mechanics
                </p>
              </div>
            </div>
            <button className="bg-transparent text-[#e94560] border-2 border-[#e94560] rounded px-6 py-2 text-[13px] cursor-pointer w-[120px] hover:bg-[#e94560] hover:text-white transition-colors">
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Company Information Section */}
      <section className="px-24 py-16 bg-[#0f3460] border-2 border-[#16213e]">
        <div className="grid grid-cols-4 gap-12">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">
              About Us
            </h3>
            <p className="text-[13px] text-[#a0a0a0]">
              Leading TCG publisher<br />
              since 2020. Creating<br />
              epic card experiences.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">
              Community
            </h3>
            <p className="text-[13px] text-[#a0a0a0]">
              Join 500K+ players<br />
              Discord • Reddit<br />
              Twitter • Forums
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">
              Support
            </h3>
            <p className="text-[13px] text-[#a0a0a0]">
              Help Center<br />
              Game Rules<br />
              Contact Us
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">
              Newsletter
            </h3>
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-[#16213e] border border-[#4a5568] rounded px-2 py-2 w-40 mb-2 text-[#e0e0e0] text-xs text-center placeholder-[#666]"
            />
            <br />
            <button className="bg-[#e94560] text-white border-2 border-[#e94560] rounded px-6 py-2 text-[13px] font-bold cursor-pointer w-40 hover:bg-[#d63850] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#16213e] border-2 border-[#0f3460] px-24 py-8 flex justify-between items-center">
        <p className="text-xs text-[#a0a0a0]">
          © 2026 TCG Studios. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a href="#privacy" className="text-xs text-[#a0a0a0] no-underline hover:text-[#e94560] transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="text-xs text-[#a0a0a0] no-underline hover:text-[#e94560] transition-colors">
            Terms
          </a>
          <a href="#legal" className="text-xs text-[#a0a0a0] no-underline hover:text-[#e94560] transition-colors">
            Legal
          </a>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return <Page0001 />;
}

export default App
