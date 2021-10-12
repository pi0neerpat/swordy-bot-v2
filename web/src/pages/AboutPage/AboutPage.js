const Detail = ({ title, text }) => (
  <>
    <h3 className="text-1xl text-gray-800 font-bold leading-none mb-3">
      {title}
    </h3>
    <p className="mb-5">{text}</p>
  </>
)

const AboutPage = () => {
  return (
    <>
      <div className="pt-6">
        <h1 className="text-3xl text-gray-800 font-bold leading-none mb-6">
          About{' '}
          <span role="img" aria-label="Crossed swords">
            ⚔️
          </span>{' '}
          Swordy Bot
        </h1>
        <Detail
          title="How does it work?"
          text="We use complicated machine learning ... just kidding! We just check if your wallet has the right tokens. If so, then you earn a role in your community's server."
        />
        <Detail
          title="How can I get started?"
          text={
            <>
              See the Bot Installation instructions:{' '}
              <a
                className="text-blue-600"
                href="https://pi0neerpat.gitbook.io/one-click-dapp/swordy-bot/swordy-bot"
                target="_blank"
                rel="noreferrer"
              >
                https://pi0neerpat.gitbook.io/one-click-dapp/swordy-bot/swordy-bot
              </a>{' '}
            </>
          }
        />
        <Detail
          title="Does it work with Unlock Protocol?"
          text={
            <>
              Absolutely! Learn how to create a new Lock here:{' '}
              <a
                className="text-blue-600"
                href="https://docs.unlock-protocol.com/creators/deploying-lock"
                target="_blank"
                rel="noreferrer"
              >
                https://docs.unlock-protocol.com/creators/deploying-lock
              </a>{' '}
            </>
          }
        />
      </div>
    </>
  )
}

export default AboutPage
