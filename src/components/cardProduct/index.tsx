/* eslint-disable no-restricted-globals */
import styled from "styled-components";
import { ProductType } from "../../types";
import { useNavigate } from 'react-router-dom';
import { defineImage } from '../../config/consts';

interface IProductType {
    product: ProductType
}

const CardProduct = ({product}: IProductType) => {
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <ContainerTitle>
                    <Title>{product.name} - (Cod: {product.id})</Title>
                </ContainerTitle>
                <Image 
                    src={defineImage(product.category)}
                    alt={product.category}
                />
                <Price>R$ {product.price}</Price>
                <ContainerButtons>
                    <GenericButton
                        onClick={() => navigate(`/products/info/${product.id}`)}
                    >
                        <TextGenericButton>+ Informações</TextGenericButton>
                    </GenericButton>
                </ContainerButtons>
            </Container>
        </>
    );
}

const Container = styled.div`
    border: 4px solid #7F2121;
    background-color: white;
    margin: 15px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 330px;
    height: 420px;  
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

const Image = styled.img`
    width: 330px;
    height: 280px;
`;

const Price = styled.h3`
    margin-top: 10px;
    color: black;
    font-family: Arial;
`;

const ContainerButtons = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

const GenericButton = styled.button`
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

    display: flex;
    justify-content: center;
    align-items: center;
`;

const TextGenericButton = styled.p`
    
`;


export default CardProduct;