const Biblio = ({
  children,
  author,
  title,
  year,
  cover,
}: {
  children?: JSX.Element | JSX.Element[] | string
  author: string
  title: string
  year: string
  cover: string
}) => {
  return (
    <div className="p-4  mx-2 flex justify-between w-full">
      <div className="text-left mt-2">
        <div className="font-semibold">{title}</div>
        <div className="font-normal">{author}</div>
        <div className="font-normal text-gray-500">{year}</div>
        <div className="text-gray-500 text-sm">{children}</div>
      </div>
      <div className="w-24 mr-2 shrink-0">
        <img 
          src={cover.startsWith('http') ? cover : "/images/books/" + cover} 
          alt="book cover" 
        />
      </div>
    </div>
  )
}

export default Biblio
