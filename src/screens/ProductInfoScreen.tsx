/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

import Header from "../components/header";
import { ProductType } from "../types";
import api from "../services/api";

import { useNavigate } from "react-router-dom";
import { widthOfWindow } from "../config/consts";
import { sendToastError, sendToastSuccess } from "../toasts/toasts";
import { defineImage } from "../config/consts";

const isMobile = widthOfWindow < 800 ? true : false;

const ProductInfoScreen = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductType>();

    const navigate = useNavigate();

    const getProductById = () => {
        api.get(`/products/${id}`)
        .then(response => {
            if (response.status === 200) {
                setProduct(response.data);
            } 
        })
        .catch(error => {
            sendToastError(error);
        })
    }

    const deleteProductById = () => {
        const dialog = confirm("Deseja deletar o produto?");
        if(dialog) {
            api.delete(`/products/${id}`)
            .then(response => {
                if (response.status === 200) {
                    navigate('/products');
                    sendToastSuccess(response.data.message);
                } 
            })
            .catch(error => {
                sendToastError(error);
            })
        }
    }

    useEffect(() => {
        getProductById();
    }, [])

    return(
        <>
            <Container>
                <Header />
                <Body>
                    <ContainerTitle>
                        <GenericButton // Back
                            onClick={() => {
                                navigate('/products');
                            }}
                        >
                            <TextGenericButton>Voltar</TextGenericButton>
                        </GenericButton>

                        <GenericButton // Delete
                            onClick={() => {
                                deleteProductById()
                            }}
                        >
                            <TextGenericButton>Excluir</TextGenericButton>
                        </GenericButton>
                        
                        <GenericButton // Update
                            onClick={() => {
                                navigate(`/products/update/${id}`);
                            }}
                        >
                            <TextGenericButton>Alterar</TextGenericButton>
                        </GenericButton>
                    </ContainerTitle>

                    <ContainerInfo>
                        <ContainerImage>
                            <Image 
                                src={defineImage(product?.category || '')}
                                alt={'Imagem da Categoria'}
                            />
                        </ContainerImage>
                        <ContainerDescription>
                            <GenericText>Código: {product?.id}</GenericText>
                            <GenericText>Nome: {product?.name}</GenericText>
                            <GenericText>Categoria: {product?.category}</GenericText>
                            <GenericText>Preço: R$ {product?.price}</GenericText>
                        </ContainerDescription>
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

    width: 25%;
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
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: ${isMobile ? 'column' : 'row'};

    width: 80%;
`;

const ContainerImage = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Image = styled.img`
    width: ${isMobile ? '200px' : '400px'};
    height: ${isMobile ? '160px' : '320px'};
`;

const ContainerDescription = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const GenericText = styled.h4`
    margin: 20px 0 20px 0;

    font-size: 26px;
    text-align: center;
`;

export default ProductInfoScreen;