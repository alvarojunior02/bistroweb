import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/header";
import { sendToastInfo, sendToastError, sendToastSuccess } from "../toasts/toasts";

import { widthOfWindow } from "../config/consts";
import api from "../services/api";

const isMobile = widthOfWindow < 800 ? true : false;

const CreateRecipeScreen = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [newIngredient, setNewIngredient] = useState<string>('');
    const [ingredients, setIngredients] = useState<string[]>([]);

    const [newPreparation, setNewPreparation] = useState<string>('');
    const [preparations, setPreparations] = useState<string[]>([]);
    
    function addNewIngredient() {
        if(newIngredient !== '') {
            setIngredients([
                    ...ingredients, newIngredient
                ],
            )
            setNewIngredient('');
        }  
    }

    function addNewPreparation() {
        if(newPreparation !== '') {
            setPreparations([
                    ...preparations, newPreparation
                ],
            )
            setNewPreparation('');
        }  
    }

    const verifyErrors = () => {
        if(title === '') {
            sendToastError('Título está em branco!');
            return true;
        }
            
        if (ingredients.length === 0) {
            sendToastError('Não adicionou nenhum ingrediente');
            return true;
        }
            
        if (preparations.length === 0) {
            sendToastError('Não adicionou nenhum modo de preparo');
            return true;
        }  

        return false
    }

    const clearInputs = () => {
        setTitle('');
        setNewIngredient('');
        setIngredients([]);
        setNewPreparation('');
        setPreparations([]);
    }

    const ingredientToRemove = (indexToFind: number) => {
        setIngredients(ingredients.filter((item, index) => {
            return index !== indexToFind
        }))
    }

    const preparationToRemove = (indexToFind: number) => {
        setPreparations(preparations.filter((item, index) => {
            return index !== indexToFind
        }))
    }

    const sendNewRecipe = () => {
        api.post('/recipes', {
            title,
            ingredients: {
                data: ingredients,
            },
            preparation: {
                data: preparations,
            }
        })
        .then((response) => {
            if(response.status === 201) {
                navigate(`/recipes/info/${response.data.id}`);
                sendToastSuccess('Receita criada com sucesso!');
                clearInputs();
            }
        })
        .catch((error) => {
            sendToastError(error)
        })
    }

    return(
        <>
            <Container>
                <Header />
                <Body>
                  <ContainerTitle>
                    <GenericButton
                      onClick={() => {
                        navigate('/recipes');
                      }}
                    >
                      <TextGenericButton>Voltar</TextGenericButton>
                    </GenericButton>

                    <Title>Nova Receita</Title>

                    <GenericButton
                      onClick={() => {
                        const isWrong = verifyErrors();
                        if(!isWrong) {
                            sendNewRecipe();
                        }
                      }}
                    >
                      <TextGenericButton>Confirmar</TextGenericButton>
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
                                ingredients.map((item, index) => {
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
                                preparations.map((item, index) => {
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
    );
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

export default CreateRecipeScreen;