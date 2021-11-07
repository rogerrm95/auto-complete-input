import { useEffect, useState } from "react"
import { SuggestionItem } from '../SuggestionItem';
import { FiX } from 'react-icons/fi'
import './styles.css'

interface AutoCompleteProps {
    items: Content[],
    onSelectedChange: (suggestion: Content) => void
}

type Content = {
    id: number,
    name: string,
    price: string,
    category: string
}

export function AutoComplete({ items, onSelectedChange }: AutoCompleteProps) {

    const [suggestions, setSuggestions] = useState(items) // Lista de Sugestões //
    const [value, setValue] = useState('') // valor do input //
    const [selectedFood, setSelectedFood] = useState({
        id: 0, name: '', price: '', category: ''
    } as Content) // Dados do item selecionado //

    useEffect(() => {
        onSelectedChange(selectedFood)
    }, [selectedFood])

    //Função responsável por realizar a busca por correspondências //
    function onChangeFood(text: string) {
        const value = text.trim().toLocaleLowerCase()

        if (value.length > 0) {
            const listOfFoods = items.filter(item => (
                item.name.toLocaleLowerCase().includes(value) && item
            ))

            setSuggestions(listOfFoods)
        } else {
            setSuggestions([])
        }

        setValue(text)
    }

    // Função responsável por fechar a lista de sugestões ao selecionar um item //
    function handleClearSelection() {
        setSelectedFood({} as Content)
        setSuggestions([])
    }

    // Função responsável por salvar no state o Item selecionado //
    function handleSelectSuggestion(suggestion: Content) {
        const selected = {
            id: suggestion.id,
            name: suggestion.name,
            price: suggestion.price,
            category: suggestion.category
        }

        setSelectedFood(selected)
        setSuggestions([])
    }


    return (
        <div className='autocomplete'>

            <div className='autocomplete-input'>
                {
                    selectedFood.name ?
                        (
                            <>
                                <input type='text' value={selectedFood.name}/>
                                <FiX onClick={handleClearSelection} size='24' />
                            </>
                        ) :
                        (
                            <input
                                type='text'
                                placeholder='Pesquisar...'
                                value={value}
                                onChange={(e) => onChangeFood(e.target.value)} />
                        )
                }
            </div>

            {/*Precisa ser position absolute*/}
            <div className='suggestion-list'>
                {
                    suggestions.map((suggestion, index) => (
                        <SuggestionItem suggestion={suggestion} key={index} onClick={() => handleSelectSuggestion(suggestion)} />)
                    )
                }
            </div>
        </div>
    )
}