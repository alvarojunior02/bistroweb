import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { RecipeType } from "../types";
import api from "../services/api";

// components
import Header from "../components/header";
import CardRecipe from "../components/cardRecipe";

const RecipesScreen = () => {
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState<RecipeType[]>();
    const [filterByTitle, setFilterByTitle] = useState('');

    const getRecipes = () => {
      api.get('/recipes')
        .then(response => {
          setRecipes(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    }

    useEffect(() => {
      getRecipes();
    }, [])

    return(
        <>
            <Container>
                <Header />

                <Body>
                  <ContainerTitle>
                    <Title>Receitas</Title>
                    <FilterByTitle
                      type={'search'}
                      value={filterByTitle}
                      onChange={value => setFilterByTitle(value.target.value)}
                      placeholder={"Filtre por título"}
                    />
                    <ButtonCreateRecipe
                      onClick={() => {
                        navigate('/recipes/create');
                      }}
                    >
                      <TextButtonCreateRecipe>Criar</TextButtonCreateRecipe>
                    </ButtonCreateRecipe>
                  </ContainerTitle>
                  <ContainerRecipes>
                    {
                      recipes?.filter((recipe) => {
                        return(
                          recipe.title.toUpperCase().includes(filterByTitle.toLocaleUpperCase())
                        )
                      }).map((recipe, index) => {
                        return (
                            <CardRecipe key={index} recipe={recipe} />
                        );  
                      })
                    }
                  </ContainerRecipes>
                  
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
  margin: 110px 0 0 0;

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

const FilterByTitle = styled.input`
    border: 2px solid black;
    background-color: white;

    width: 40%;
    height: 40px;
    padding: 0 10px;
`;

const ButtonCreateRecipe = styled.button`
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

const TextButtonCreateRecipe = styled.p`
  font-size: 12px;
  text-align: center;
  font-weight: bold;
`;

const ContainerRecipes = styled.div`
  margin: 10px 0 0 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default RecipesScreen;