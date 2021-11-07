import './styles.css'

type SuggestionItemProps = {
    suggestion: {
        id: number
        name: string,
        price: string,
        category: string
    },
    onClick?: () => void
}

export function SuggestionItem({ suggestion, onClick }: SuggestionItemProps) {
    return (
        <div className='container' onClick={onClick}>
            <p className='food'>{suggestion.name}</p>

            <div className='info-box'>
                <span className='category'>{suggestion.category}</span>

                <p className='price'>
                    {`R$ ${suggestion.price}`}
                </p>
            </div>

            <hr />

        </div>
    )
}