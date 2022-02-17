import { useNavigate } from 'react-router-dom';

import {Container, Logo, NavBar, NavLink, NavText} from './style';

import { widthOfWindow } from "../../config/consts";

const logo = require('../../images/logo.png');

const isMobile = widthOfWindow < 800 ? true : false;

const Header = () => {
    const navigate = useNavigate();

    return(
        <> 
            <Container>
                {
                    !isMobile 
                        ? (
                            <Logo 
                                src={logo}
                                alt="Logo"
                            />
                        ) : null
                }
                <NavBar>
                    <NavLink onClick={() => navigate('/')}>
                        <NavText>Home</NavText>
                    </NavLink>
                    <NavLink onClick={() =>  navigate('/products')}>
                        <NavText>Produtos</NavText>
                    </NavLink>
                    <NavLink onClick={() =>  navigate('/recipes')}>
                        <NavText>Receitas</NavText>
                    </NavLink>
                </NavBar>
            </Container>
        </>
    )
}

export default Header;