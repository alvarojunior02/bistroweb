/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

import Header from "../components/header";
import { IngredientsType, PreparationType, RecipeType } from "../types";
import api from "../services/api";

import { useNavigate } from "react-router-dom";
import { widthOfWindow } from "../config/consts";
import { sendToastError, sendToastSuccess } from "../toasts/toasts";

const isMobile = widthOfWindow < 800 ? true : false;

const RecipeInfoScreen = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipeType>();
    const [ingredients, setIngredients] = useState<IngredientsType>({
        data: []
    });
    const [preparation, setPreparation] = useState<PreparationType>({
        data: []
    });

    const navigate = useNavigate();

    const getRecipeById = () => {
        api.get(`/recipes/${id}`)
        .then(response => {
            if (response.status === 200) {
                setRecipe(response.data);
                setIngredients(JSON.parse(response.data.ingredients));
                setPreparation(JSON.parse(response.data.preparation));
            } 
        })
        .catch(error => {
            sendToastError(error);
        })
    }

    const deleteRecipeById = () => {
        const dialog = confirm("Deseja deletar a receita?");
        if(dialog) {
            api.delete(`/recipes/${id}`)
            .then(response => {
                if (response.status === 200) {
                    navigate('/recipes');
                    sendToastSuccess(response.data.message);
                } 
            })
            .catch(error => {
                sendToastError(error);
            })
        }
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
                        <GenericButton // Back
                            onClick={() => {
                                navigate('/recipes');
                            }}
                        >
                            <TextGenericButton>Voltar</TextGenericButton>
                        </GenericButton>

                        <Title>{recipe?.title} (Cód: {recipe?.id})</Title>

                        <GenericButton // Delete
                            onClick={() => {
                                deleteRecipeById()
                            }}
                        >
                            <TextGenericButton>Excluir</TextGenericButton>
                        </GenericButton>
                        
                        <GenericButton // Update
                            onClick={() => {
                                navigate(`/recipes/update/${id}`);
                            }}
                        >
                            <TextGenericButton>Alterar</TextGenericButton>
                        </GenericButton>
                    </ContainerTitle>
                    

                    <ContainerInfo>
                        <ContainerIngredients>
                            <Subtitle>Ingredientes</Subtitle>
                            <ListIngredients>
                                {
                                    ingredients.data.map((item, index) => {
                                        return(
                                            <ItemListIngredients key={index}>{item}</ItemListIngredients>
                                        );
                                    })
                                }
                            </ListIngredients>
                        </ContainerIngredients>
    
                        <ContainerPreparation>
                            <Subtitle>Modo de preparo</Subtitle>
                            <ListPreparation>
                                {
                                    preparation.data.map((item, index) => {
                                        return(
                                            <ItemListPreparation key={index}>{item}</ItemListPreparation>
                                        );
                                    })
                                }
                            </ListPreparation>
                        </ContainerPreparation>
                    </ContainerInfo>
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
    margin: 110px 0 0 0;

    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ContainerTitle = styled.div`
    width: 80%;

    display: flex;
    justify-content: space-between;
    align-items: center;
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

const ContainerInfo = styled.div`
    margin: 10px 0 20px 0;
    padding: 0 40px;
    border: 2px solid #7F2121;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: ${isMobile ? 'column' : 'row'};

    width: 80%;
`;

const Subtitle = styled.h3`
    color: black;
    font-weight: bold;
    font-size: 26px;

    margin: 10px 0 16px 0;
`;

const ContainerIngredients = styled.div`
    display: flex;
    flex-direction: column;

    width: ${isMobile ? '80%' : '40%'};
`;

const ListIngredients = styled.ul`
    margin: 15px 0 15px 0;
    display: grid;
    gap: 16px;
`;

const ItemListIngredients = styled.li`
    font-size: 18px;
    font-weight: 500;
`;

const ContainerPreparation = styled.div`
    display: flex;
    flex-direction: column;

    width: ${isMobile ? '80%' : '40%'};
`;

const ListPreparation = styled.ol`
    margin: 15px 0 15px 0;
    display: grid;
    gap: 16px;
`;

const ItemListPreparation = styled.li`
    font-size: 18px;
    font-weight: 500;
`;

export default RecipeInfoScreen;