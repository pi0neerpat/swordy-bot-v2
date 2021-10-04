import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import Waves from 'src/pages/HomePage/Waves'
import BotButton from 'src/pages/HomePage/BotButton'
import GuildCountCell from 'src/components/GuildCount/GuildCountCell'
import GuildStatsCell from 'src/components/GuildStats/GuildStatsCell'

const Detail = ({ title, text }) => (
  <>
    <h3 className="text-1xl text-gray-800 font-bold leading-none mb-3">
      {title}
    </h3>
    <p className="mb-3" className="mb-5">
      {text}
    </p>
  </>
)

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" />
      <div className="bg-gradient-to-r from-blue-200 to-blue-300 ">
        <div className="flex p-16 mb-12 items-center ">
          <div className="container  m-4">
            <h1 className="text-5xl font-bold leading-tight  ">
              ⚔️ Swordy Bot
            </h1>
            <h3 className="mt-8 text-2xl leading-tight">
              Your Kingdom... Your Roles
            </h3>
            <p className="mt-2 italic">Web3 community manager</p>
            <BotButton />
          </div>
          <div className="w-full border-8 border-black rounded">
            <video autoPlay loop>
              <source type="video/mp4" src="/demo.mp4" />
            </video>
          </div>
        </div>
        <Waves />

        <section className="w-full bg-white p-16 container max-w-5xl mx-auto items-center">
          <h1 className="text-3xl w-full text-center text-gray-800 font-bold leading-none mb-8">
            Activity
          </h1>
          <div className="w-full items-center">
            <div className="flex w-full justify-center">
              <GuildCountCell />
            </div>
            <p className="mt-2 text-center">Active Communities</p>
            <GuildStatsCell className="mt-5" />
          </div>
        </section>
        <section className="w-full  justify-center grid bg-white p-16 container max-w-5xl mx-auto items-center">
          <h1 className="text-3xl w-full text-center text-gray-800 font-bold leading-none mb-8">
            About
          </h1>
          <Detail
            title="How does it work?"
            text="We use complicated machine learning ... just kidding! We just check if the user's wallet has the right tokens. If so, they earn a role in your community's server."
          />
          <Detail
            title="How can I add this to my server?"
            text={
              <>
                Check out the{' '}
                <a
                  className="text-blue-600"
                  href="https://pi0neerpat.gitbook.io/one-click-dapp/swordy-bot/swordy-bot"
                  target="_blank"
                >
                  Bot Installation instructions
                </a>
                , or watch the video below.
              </>
            }
          />
          <iframe
            width="560"
            height="315"
            className=" mb-6"
            src="https://www.youtube.com/embed/JeM8oJE94zg"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
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

        <svg
          className="wave-top"
          viewBox="0 0 1439 147"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
              <g className="wave" fill="#ffffff">
                <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
              </g>
              <g transform="translate(1.000000, 15.000000)" fill="#ffffff">
                <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                  <path
                    d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                    opacity="0.100000001"
                  ></path>
                  <path
                    d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                    opacity="0.100000001"
                  ></path>
                  <path
                    d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                    opacity="0.200000003"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>

        {/* CTA block */}
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
