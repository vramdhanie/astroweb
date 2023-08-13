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
        <div className={className}>
            <h4>
                <span className="title">{title}</span>
                <span>{subtitle}</span>
            </h4>
        </div>
    )
}

export default Title
