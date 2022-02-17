import { useState } from "react";
import styled from "styled-components";

import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { 
    sendToastSuccess,
    sendToastError,
} from "../../toasts/toasts";

const SearchInHome = () => {
    const [currentTypeSelected, setCurrentTypeSelected] = useState('Select');
    const [currentSearchBy, setCurrentSearchBy] = useState('Select');
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    function ErrorSelectType() {
        let isWrong = false;
        if (currentTypeSelected === 'Select') {
            isWrong = true;
        }

        return isWrong;        
    }

    function ErrorSelectSearchBy() {
        let isWrong = false;
        if (currentSearchBy === 'Select') {
            isWrong = true;
        }

        return isWrong; 
    }

    function ErrorSearchBarNull() {
        let isWrong = false;
        if (currentTypeSelected !== 'Select' && currentSearchBy !== 'Select' && searchTerm === '') {
            isWrong = true;
        }

        return isWrong;        
    }

    const recipeIdExist = async () => {
        await api.get(`/recipes/${parseInt(searchTerm)}`)
        .then(response => {
            if (response.status === 200) {
                sendToastSuccess("Receita encontrada");
                setTimeout(() => {
                    navigate(`/recipes/info/${parseInt(searchTerm)}`)
                }, 1500);
            } 
        })
        .catch(error => {
            sendToastError("Receita não encontrada");
        })
    }

    const recipeTitleExist = async () => {
        await api.get(`/recipes/title/${searchTerm}`)
        .then(response => {
            if (response.status === 200) {
                sendToastSuccess("Receita encontrada");
                setTimeout(() => {
                    navigate(`/recipes/info/${response.data.id}`)
                }, 1500);
            } 
        })
        .catch(error => {
            sendToastError("Receita não encontrada");
        })
    }

    const productIdExist = async () => {
        await api.get(`/products/${parseInt(searchTerm)}`)
        .then(response => {
            if (response.status === 200) {
                sendToastSuccess("Produto encontrado");
                setTimeout(() => {
                    navigate(`/products/info/${parseInt(searchTerm)}`)
                }, 1500);
            } 
        })
        .catch(error => {
            sendToastError("Produto não encontrado");
        })
    }

    const productNameExist = async () => {
        await api.get(`/products/name/${searchTerm}`)
        .then(response => {
            if (response.status === 200) {
                sendToastSuccess("Produto encontrado");
                setTimeout(() => {
                    navigate(`/products/info/${response.data.id}`)
                }, 1500);
            } 
        })
        .catch(error => {
            sendToastError("Produto não encontrado");
        })
    }

    return(
        <>
            <Container>
                <Select
                    value={currentTypeSelected} 
                    onChange={(value) => 
                        setCurrentTypeSelected(value.target.value)
                    }
                >
                    <option value={'Select'}> Selecione um tipo </option>
                    <option value={'Products'}> Produtos </option>
                    <option value={'Recipes'}> Receitas </option>
                </Select>

                <Select
                    value={currentSearchBy} 
                    onChange={(value) => {
                        setCurrentSearchBy(value.target.value);
                        setSearchTerm('');
                    }}
                >
                    <option value={'Select'}> Buscar por termo </option>
                    <option value={'NameOrTitle'}> Nome ou Título </option>
                    <option value={'Id'}> Código (ID) </option>
                </Select>

                {
                    currentSearchBy === 'Id'
                        ?
                            <>
                                <SearchBarId 
                                    min={1}
                                    type={'number'}
                                    onChange={(value) => {
                                        setSearchTerm(value.target.value);
                                    }}
                                    value={searchTerm}
                                    placeholder={'Código'}
                                />
                            </>
                        : currentSearchBy === 'NameOrTitle' 
                            ?   
                                <>
                                    <SearchBar 
                                        type={'search'}
                                        onChange={(value) => {
                                            setSearchTerm(value.target.value);
                                        }}
                                        value={searchTerm}
                                        placeholder={'Informe o nome ou título'}
                                    />
                                </>
                            : null
                }
                
                <SubmitSearch
                    onClick={() => {
                        const isWrongInSelectType = ErrorSelectType();
                        if(isWrongInSelectType) 
                            sendToastError("Selecione um tipo.");
                        
                        const isWrongInSelectSearchBy = ErrorSelectSearchBy();
                        if(isWrongInSelectSearchBy)
                            sendToastError("Busque por um termo.");

                        const isWrongSearchBarNull = ErrorSearchBarNull();
                        if (isWrongSearchBarNull)
                            sendToastError("Barra de pesquina em branco.");

                        if(!isWrongInSelectType && !isWrongInSelectSearchBy && !isWrongSearchBarNull) {
                            if(currentTypeSelected === 'Recipes') {
                                if(currentSearchBy === 'Id') {
                                    recipeIdExist();
                                } else {
                                    recipeTitleExist();
                                }
                            } else if (currentTypeSelected === 'Products') {
                                if(currentSearchBy === 'Id') {
                                    productIdExist()
                                } else {
                                    productNameExist();
                                }
                            }
                        }
                    }}
                >
                    <TextSubmitSearch>Buscar</TextSubmitSearch>
                </SubmitSearch>
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;

const Select = styled.select`
    margin: 15px 0 0 0;
    background-color: white;
    border: 2px solid black;

    width: 200px;
    height: 30px;
    padding: 0 10px;
`;

const SearchBar = styled.input`
    margin: 40px 0 0 0;
    border: 2px solid black;

    width: 200px;
    height: 40px;
    padding: 0 10px;

    text-align: center;
`;

const SearchBarId = styled.input`
    margin: 40px 0 0 0;
    border: 2px solid black;

    width: 176px;
    height: 36px;
    padding: 0 10px;

    text-align: center;
`;

const SubmitSearch = styled.button`
    margin: 15px 0 0 0;
    background-color: white;
    border: 2px solid black;

    width: 200px;
    height: 30px;
    padding: 0 10px;

    cursor: pointer;
    transition: all 0.8s;

    &:hover {
        background-color: #7F2121;
        color: white;
    }

    display: flex;
    justify-content: center;
    align-items: center;
`;

const TextSubmitSearch = styled.p`
    text-align: center;
    font-weight: bold;
`;

export default SearchInHome;