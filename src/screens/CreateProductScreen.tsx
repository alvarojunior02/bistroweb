import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/header";
import { sendToastInfo, sendToastError, sendToastSuccess } from "../toasts/toasts";

import { widthOfWindow } from "../config/consts";
import api from "../services/api";

const isMobile = widthOfWindow < 800 ? true : false;

const CreateProductScreen = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [price, setPrice] = useState<number>(0.0);

    const verifyErrors = () => {
        if(name === '') {
            sendToastError('Nome está em branco!');
            return true;
        }
            
        if (category === 'Select') {
            sendToastError('Selecione uma categoria!');
            return true;
        }
            
        if (price === 0) {
            sendToastError('Infome o valor do produto!');
            return true;
        }  

        return false
    }

    const clearInputs = () => {
        setName('');
        setCategory('Select');
        setPrice(0.0);
    }

    const sendNewProduct = () => {
        api.post('/products', {
            name,
            price,
            category,
        })
        .then((response) => {
            if(response.status === 201) {
                navigate(`/products/info/${response.data.id}`);
                sendToastSuccess('Produto criada com sucesso!');
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
                        navigate('/products');
                      }}
                    >
                      <TextGenericButton>Voltar</TextGenericButton>
                    </GenericButton>

                    <Title>Novo Produto</Title>

                    <GenericButton
                      onClick={() => {
                        const isWrong = verifyErrors();
                        if(!isWrong) {
                            sendNewProduct();
                        }
                      }}
                    >
                      <TextGenericButton>Confirmar</TextGenericButton>
                    </GenericButton>
                  </ContainerTitle>

                  <ContainerFormNewProduct>
                    <ContainerInputTitle>
                        <GenericLabel>Nome: </GenericLabel>
                        <InputTitle 
                            type={'text'}
                            value={name}
                            onChange={(value) => {
                                setName(value.target.value);
                                if(value.target.value.length >= 55) {
                                    sendToastInfo('Nome chegou ao limite de tamanho')
                                }
                            }}
                            maxLength={55}
                        />
                    </ContainerInputTitle>

                    <ContainerInput>
                        <SubContainerInput>
                            <GenericLabel>Categoria: </GenericLabel>
                            <SelectCategory
                                value={category}
                                onChange={(value) => {
                                    setCategory(value.target.value);
                                }}
                            >
                                <option value='Select'>Selectione: </option>
                                <option value='Bovino'>Carne Bovina</option>
                                <option value='Frango'>Frango</option>
                                <option value='Peixe'>Peixe</option>
                                <option value='Doce'>Doce</option>
                                <option value='Salada'>Salada</option>
                                <option value='Refrigerante'>Refrigerante</option>
                                <option value='Suco'>Suco</option>
                            </SelectCategory>
                        </SubContainerInput>
                        <SubContainerInput>
                            <GenericLabel>Preço: </GenericLabel>
                            <GenericInput 
                                type={'number'}
                                value={price}
                                onChange={(value) => {
                                    setPrice(parseInt(value.target.value));
                                }}
                            />
                        </SubContainerInput>
                    </ContainerInput>
                        
                  </ContainerFormNewProduct>
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

const ContainerFormNewProduct = styled.div`
    margin: 40px 0 0 0;

    width: ${isMobile ? '90%' : '80%'};

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ContainerInputTitle = styled.div`
    width: ${isMobile ? '100%' : '50%'};

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ContainerInput = styled.div`
    width: ${isMobile ? '100%' : '50%'};

    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const SubContainerInput = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

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

    width: ${isMobile ? '200px' : '75%'};
    height: 40px;

    padding-left: 10px;
    margin: 20px 0 0 0;
`;

const SelectCategory = styled.select`
    background-color: white;
    border: 2px solid black;

    width: ${isMobile ? '160px' : '75%'};
    height: 40px;

    padding-left: 10px;
    margin: 20px 0 0 0;
`;

const GenericInput = styled.input`
    background-color: white;
    border: 2px solid black;

    width: ${isMobile ? '160px' : '25%'};
    height: 40px;

    padding-left: 10px;
    margin: 20px 0 0 0;
`;

export default CreateProductScreen;