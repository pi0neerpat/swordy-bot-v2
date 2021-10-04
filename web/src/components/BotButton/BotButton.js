import { ADD_BOT_LINK } from 'src/helpers/constants'

const BotButton = () => {
  return (
    <div className="w-full justify-center">
      <a
        href={ADD_BOT_LINK}
        className="hover:underline bg-white text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg"
      >
        Add Bot{'  '} 🤖
      </a>
    </div>
  )
}
export default BotButton
