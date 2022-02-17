/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import Header from "../components/header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { sendToastInfo, sendToastError, sendToastSuccess } from "../toasts/toasts";

import { widthOfWindow } from "../config/consts";
import api from "../services/api";
import { IngredientsType, PreparationType } from "../types";

const isMobile = widthOfWindow < 800 ? true : false;

const UpdateRecipeScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [initialTitle, setInitialTitle] = useState<string>('');

    const [newIngredient, setNewIngredient] = useState<string>('');
    const [ingredients, setIngredients] = useState<IngredientsType>({
        data: []
    });
    const [initialIngredients, setInitialIngredients] = useState<IngredientsType>({
        data: []
    });

    const [newPreparation, setNewPreparation] = useState<string>('');
    const [preparation, setPreparation] = useState<PreparationType>({
        data: []
    });
    const [initialPreparation, setInitialPreparation] = useState<PreparationType>({
        data: []
    });
    const addNewIngredient = () => {
        if(newIngredient !== '') {
            setIngredients({
                data: [
                    ...ingredients.data, newIngredient
                ]
            })
            setNewIngredient('');
        }  
    }

    const addNewPreparation = () => {
        if(newPreparation !== '') {
            setPreparation({
                data: [
                    ...preparation.data, newPreparation
                ]
            })
            setNewPreparation('');
        }  
    }

    const verifyErrors = () => {
        if(title === '') {
            sendToastError('Título está em branco!');
            return true;
        }
            
        if (ingredients.data.length === 0) {
            sendToastError('Não adicionou nenhum ingrediente');
            return true;
        }
            
        if (preparation.data.length === 0) {
            sendToastError('Não adicionou nenhum modo de preparo');
            return true;
        }  

        return false
    }

    const clearInputs = () => {
        setTitle('');
        setNewIngredient('');
        setIngredients({data: []});
        setNewPreparation('');
        setPreparation({data: []});
    }

    const ingredientToRemove = (indexToFind: number) => {
        setIngredients({data: ingredients.data.filter((item, index) => {
            return index !== indexToFind
        })})
    }

    const preparationToRemove = (indexToFind: number) => {
        setPreparation({data: preparation.data.filter((item, index) => {
            return index !== indexToFind
        })})
    }

    const undoUpdates = () => {
        setTitle(initialTitle);
        setIngredients(initialIngredients);
        setPreparation(initialPreparation);
    }

    const updateRecipe = () => {
        api.put(`/recipes/${id}`, {
            title,
            ingredients: {
                data: ingredients,
            },
            preparation: {
                data: preparation,
            }
        })
        .then((response) => {
            if(response.status === 200) {
                navigate(`/recipes/info/${id}`);
                sendToastSuccess(response.data.message);
                clearInputs();
            }
        })
        .catch((error) => {
            sendToastError(error);
        })
    }

    const getRecipeById = () => {
        api.get(`/recipes/${id}`)
        .then(response => {
            if (response.status === 200) {
                setTitle(response.data.title);
                setInitialTitle(response.data.title);
                setIngredients(JSON.parse(response.data.ingredients));
                setInitialIngredients(JSON.parse(response.data.ingredients));
                setPreparation(JSON.parse(response.data.preparation));
                setInitialPreparation(JSON.parse(response.data.preparation));
            } 
        })
        .catch(error => {
            sendToastError(error);
        })
    }

    useEffect(() => {
        getRecipeById();
    }, [])

    return(
        <>
            <Container>
                <Header />
                <Body>
                <ContainerTitle>
                    <GenericButton
                        onClick={() => {
                            navigate(`/recipes/info/${id}`);
                        }}
                    >
                        <TextGenericButton>Voltar</TextGenericButton>
                    </GenericButton>

                    <Title>Alterar Receita</Title>

                    <GenericButton
                        onClick={() => {
                            undoUpdates();
                        }}
                    >
                        <TextGenericButton>Desfazer</TextGenericButton>
                    </GenericButton>

                    <GenericButton
                        onClick={() => {
                            const isWrong = verifyErrors();
                            if(!isWrong) {
                                updateRecipe();
                            }
                        }}
                    >
                        <TextGenericButton>Editar</TextGenericButton>
                    </GenericButton>
                </ContainerTitle>

                <ContainerFormNewRecipe>
                    <ContainerInput>
                        <GenericLabel>Título: </GenericLabel>
                        <InputTitle 
                            type={'text'}
                            value={title}
                            onChange={(value) => {
                                setTitle(value.target.value);
                                if(value.target.value.length >= 55) {
                                    sendToastInfo('Título chegou ao limite de tamanho')
                                }
                            }}
                            maxLength={55}
                        />
                    </ContainerInput>

                    <ContainerInput>
                        <GenericLabel>Ingrediente: </GenericLabel>
                        <SubContainerInput>
                            <GenericInput 
                                type={'text'}
                                value={newIngredient}
                                onChange={(value) => {
                                    setNewIngredient(value.target.value);
                                }}
                            />
                            <ButtonAdd
                                onClick={() => {
                                    addNewIngredient();
                                }}
                            >
                                <TextButtonAdd> + </TextButtonAdd>
                            </ButtonAdd>
                        </SubContainerInput>
                        <List>
                            {
                                ingredients.data.map((item, index) => {
                                    return(
                                        <ItemList key={index}>
                                            <ButtonRemove
                                                onClick={() => {
                                                    ingredientToRemove(index);
                                                }}
                                            >
                                                -
                                            </ButtonRemove>
                                            {item}
                                        </ItemList>
                                    );
                                })
                            }
                        </List>
                    </ContainerInput>

                    <ContainerInput>
                        <GenericLabel>Modo de Preparo: </GenericLabel>
                        <SubContainerInput>
                            <GenericInput 
                                type={'text'}
                                value={newPreparation}
                                onChange={(value) => {
                                    setNewPreparation(value.target.value);
                                }}
                            />
                            <ButtonAdd
                                onClick={() => {
                                    addNewPreparation();
                                }}
                            >
                                <TextButtonAdd> + </TextButtonAdd>
                            </ButtonAdd>
                        </SubContainerInput>
                        <List>
                            {
                                preparation.data.map((item, index) => {
                                    return(
                                        <ItemList key={index}>
                                            <ButtonRemove
                                                onClick={() => {
                                                    preparationToRemove(index);
                                                }}
                                            >
                                                -
                                            </ButtonRemove>
                                            {item}
                                        </ItemList>
                                    );
                                })
                            }
                        </List>
                    </ContainerInput>
                        
                </ContainerFormNewRecipe>
                </Body>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin: 0;
    padding: 0;
`;
const Body = styled.div`
  margin: 110px 0 40px 0;

  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ContainerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 80%;
`;

const Title = styled.h2`
  color: black;
  text-align: center;
  font-weight: bold;
`;

const GenericButton = styled.button`
  border: 2px solid black;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: all 0.2s;
  color: black;

  &:hover {
    background-color: #7F2121;
    color: white;
  }

  width: 15%;
  height: 40px;
`;

const TextGenericButton = styled.p`
  text-align: center;
  font-weight: bold;
`;

const ContainerFormNewRecipe = styled.div`
    margin: 40px 0 0 0;

    width: ${isMobile ? '90%' : '80%'};

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ContainerInput = styled.div`
    width: ${isMobile ? '100%' : '50%'};

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`;

const SubContainerInput = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    margin: 20px 0 0 0;
`;

const GenericLabel = styled.label`
    font-size: 16px;
    font-weight: bold;

    margin: 20px 0 0 0;
`;

const InputTitle = styled.input`
    background-color: white;
    border: 2px solid black;

    width: ${isMobile ? '200px' : '100%'};
    height: 40px;

    padding-left: 10px;
    margin: 20px 0 0 0;
`;

const GenericInput = styled.input`
    background-color: white;
    border: 2px solid black;

    width: ${isMobile ? '160px' : '75%'};
    height: 40px;

    padding-left: 10px;
`;

const ButtonAdd = styled.button`
    border: 2px solid black;
    background-color: white;

    margin-left: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: all 0.2s;
    color: black;

    &:hover {
        background-color: #7F2121;
        color: white;
    }

    width: 15%;
    height: 40px;
`;

const TextButtonAdd = styled.p`
    text-align: center;
    font-weight: bold;
`;

const List = styled.ul`
    margin-left: 20px;
`;

const ItemList = styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;

    margin: 10px 0 0 0;
`;

const ButtonRemove = styled.button`
    border: 2px solid black;
    background-color: white;

    margin: 0 20px 0 0;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: all 0.2s;
    color: black;

    &:hover {
        background-color: #7F2121;
        color: white;
    }

    width: 20px;
    height: 20px;
`;

export default UpdateRecipeScreen;