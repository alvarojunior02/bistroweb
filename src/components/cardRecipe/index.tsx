import styled from "styled-components";
import { IngredientsType, RecipeType } from "../../types";
import { useNavigate } from 'react-router-dom';

interface IRecipeType {
    recipe: RecipeType
}

const CardRecipe = ({recipe}: IRecipeType) => {
    const navigate = useNavigate();

    const ingredients: IngredientsType = JSON.parse(recipe.ingredients);

    return (
        <>
            <Container>
                <ContainerTitle>
                    <Title>{recipe.title} (Cod: {recipe.id})</Title>
                </ContainerTitle>
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
                <ButtonMoreInfo
                    onClick={() => navigate(`/recipes/info/${recipe.id}`)}
                >
                    + Informações
                </ButtonMoreInfo>
            </Container>
        </>
    );
}

const Container = styled.div`
    border: 4px solid #7F2121;
    background-color: white;
    margin: 15px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    width: 400px;
    height: 400px;  
`;

const ContainerTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 60px;
    background-color: #7F2121;
`;

const Title = styled.h3`
    color: white;
    font-weight: bold;
    text-align: center;
`;

const ContainerIngredients = styled.div`
    width: 80%;
    height: 80%;

    box-sizing: border-box;
`;

const Subtitle = styled.h4`
    color: black;
    font-weight: bold;
    font-size: 18px;
    text-align: center;

    margin: 10px 0 16px 0;
`;

const ListIngredients = styled.ul`
    margin: 15px 0 15px 0;
`;

const ItemListIngredients = styled.li`
    font-size: 16px;
    font-weight: 500;
`;

const ButtonMoreInfo = styled.button`
    border: none;
    background-color: transparent;

    cursor: pointer;
    transition: all 0.8s;
    &:hover {
        text-decoration: underline;
    }

    font-size: 16px;
    
    width: 100%;
    height: 60px;
`;


export default CardRecipe;