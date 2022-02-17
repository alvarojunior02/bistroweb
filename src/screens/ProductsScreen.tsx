import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { ProductType } from "../types";
import api from "../services/api";

// components
import Header from "../components/header";
import CardProduct from "../components/cardProduct";

const ProductsScreen = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState<ProductType[]>();
    const [filterByName, setFilterByName] = useState('');

    const getProducts = () => {
        api.get('/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
            console.log(error);
            })
    }

    useEffect(() => {
        getProducts();
    }, [])

    return(
        <>
            <Container>
                <Header />

                <Body>
                  <ContainerTitle>
                    <Title>Produtos</Title>
                    <FilterByName
                      type={'search'}
                      value={filterByName}
                      onChange={value => setFilterByName(value.target.value)}
                      placeholder={"Filtre por nome"}
                    />
                    <ButtonCreate
                      onClick={() => {
                        navigate('/products/create');
                      }}
                    >
                      <TextButtonCreate>Criar</TextButtonCreate>
                    </ButtonCreate>
                  </ContainerTitle>
                  <ContainerCards>
                    {
                      products?.filter((product) => {
                        return(
                            product.name.toUpperCase().includes(filterByName.toLocaleUpperCase())
                        )
                      }).map((product, index) => {
                        return (
                            <CardProduct key={index} product={product} />
                        );  
                      })
                    }
                  </ContainerCards>
                  
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

const FilterByName = styled.input`
    border: 2px solid black;
    background-color: white;

    width: 40%;
    height: 40px;
    padding: 0 10px;
`;

const ButtonCreate= styled.button`
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

const TextButtonCreate = styled.p`
  font-size: 12px;
  text-align: center;
  font-weight: bold;
`;

const ContainerCards = styled.div`
  margin: 10px 0 0 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default ProductsScreen;