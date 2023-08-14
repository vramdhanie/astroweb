const Quote = ({
  children,
  author,
}: {
  children: JSX.Element | JSX.Element[]
  author: string
}) => {
  return (
    <div className="border-l-solid border-l-4 border-l-gray-200 p-4 ml-4 mx-2">
      {children}
      <div className="text-right mt-2">
        <span className="font-semibold">- {author}</span>
      </div>
    </div>
  )
}

export default Quote
