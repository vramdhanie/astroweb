const Pod = ({
  children,
  presenters,
  title,
  yearStarted,
  isActive,
  cadence,
  numberOfEpisodes,
  cover,
}: {
  children?: JSX.Element | JSX.Element[] | string
  presenters: string[]
  title: string
  yearStarted: string
  cover: string
  isActive: boolean
  cadence: 'daily' | 'every few days' | 'every two weeks' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  numberOfEpisodes: number
}) => {
  return (
    <div className="p-4  mx-2 flex justify-between w-full">
      <div className="text-left mt-2">
        <div className="font-semibold">{title}</div>
        <div className="font-normal">{presenters.join(', ')}</div>
        <div className="flex justify-between">

          <div className="font-normal text-gray-500">Started: {yearStarted}</div>
          <div className="font-normal text-gray-500">Released {cadence}</div>
          <div className="font-normal text-gray-500">{numberOfEpisodes} episodes</div>
        </div>
        <div className="text-gray-500 text-sm">{children}</div>
      </div>
      <div className="w-24 mx-2 shrink-0">
        <img src={"/images/podcasts/" + cover} alt="podcast cover" />
      </div>
    </div>
  )
}

export default Pod
