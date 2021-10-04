import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { BottomWaves, TopWaves } from 'src/pages/HomePage/Waves'
import BotButton from 'src/pages/HomePage/BotButton'
import GuildCountCell from 'src/components/GuildCount/GuildCountCell'
import GuildStatsCell from 'src/components/GuildStats/GuildStatsCell'

const Detail = ({ title, text }) => (
  <>
    <h3 className="mt-5 text-gray-800 font-bold mb-3">{title}</h3>
    <p>{text}</p>
  </>
)

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" />
      <div className="bg-gradient-to-r from-blue-200 to-blue-300 ">
        <div className="sm:flex p-6  sm:p-16 mb-12 items-center ">
          <div className="w-full m-4">
            <h1 className="text-5xl font-bold leading-tight  ">
              ⚔️ Swordy Bot
            </h1>
            <h3 className="mt-8 text-2xl leading-tight">
              Your Kingdom... Your Roles
            </h3>
            <p className="mt-2 italic">Web3 community manager</p>
            <BotButton />
          </div>
          <div className="mt-16 sm:mt-0 border-8 border-black rounded">
            <video autoPlay loop>
              <source type="video/mp4" src="/demo.mp4" />
            </video>
          </div>
        </div>
        <TopWaves />
      </div>

      <section className="w-full p-6  sm:p-16 bg-white  container items-start max-w-5xl mx-auto ">
        <div className=" text-center w-full">
          <GuildCountCell />
          <h1 className="mt-4 text-3xl items-center text-center text-gray-800 font-bold leading-none">
            Communities Managed
          </h1>
        </div>
        <div className="rw-segment p-8 pt-4 mt-8 max-h-screen overflow-y-scroll">
          <GuildStatsCell />
        </div>
      </section>
      <section className="w-full p-6 sm:p-16 justify-center grid bg-white mb-12">
        <h1 className="text-3xl  text-center text-gray-800 font-bold leading-none mb-4">
          About
        </h1>
        <Detail
          title="How does it work?"
          text="We use high tech machine learning ... just kidding! We just check if the user's wallet has the right tokens. If so, they earn a role in your community's server."
        />
        <Detail
          title="How do I add this to my server?"
          text={
            <>
              Check out the{' '}
              <a
                className="text-blue-600"
                href="https://pi0neerpat.gitbook.io/one-click-dapp/swordy-bot/swordy-bot"
                target="_blank"
              >
                Bot Setup Guide
              </a>
              .
            </>
          }
        />

        <Detail
          title="What is Unlock Protocol?"
          text={
            <>
              Unlock makes it easy to distribute NFTs to your community. Learn
              how to{' '}
              <a
                className="text-blue-600"
                href="https://docs.unlock-protocol.com/creators/deploying-lock"
                target="_blank"
              >
                create your own Lock
              </a>
              {'.'}
            </>
          }
        />
      </section>
      <BottomWaves />
      <div className="bg-gradient-to-r from-blue-200 to-blue-300 ">
        <div className="h-72 mt-4 text-center items-center">
          <h2 className="w-full text-4xl font-bold leading-tight text-center ">
            You decide who's worthy
          </h2>
          <div className="mt-8">
            <BotButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
