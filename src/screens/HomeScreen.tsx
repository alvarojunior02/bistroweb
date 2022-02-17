import styled from 'styled-components';

// components
import Header from '../components/header';
import SearchInHome from '../components/searchInHome';

// images
const background = require("../images/background.jpg");

const HomeScreen = () => {
    return(
        <>
            <Container>
                <Header />

                <Body>
                    <Title> Sistema SMG Bistro</Title>
                    <Section>
                        <TextSection>Realizar Busca</TextSection>
                        <SearchInHome />
                    </Section>
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
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;

const Title = styled.h1`
    margin-top: 120px;

    color: white;
    text-align: center;
    font-weight: bold;
    text-shadow: 1px 1px 1px black;
`;

const Section = styled.div`
    margin: 25px 0 0 0;

    border-radius: 20px;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.25);
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(2px);

    width: 500px;
    height: 350px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;

const TextSection = styled.h2`
    color: white;
    text-align: center;
    font-weight: bold;

    margin-top: 15px;

    text-shadow: 1px 1px 1px black;
`;


export default HomeScreen;