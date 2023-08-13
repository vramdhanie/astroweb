const Title = ({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle: string
  className?: string
}) => {
  return (
    <div className="flex gap-2">
      <span className="font-semibold">{title}</span>
      <span className="font-light">{subtitle}</span>
    </div>
  )
}

export default Title
