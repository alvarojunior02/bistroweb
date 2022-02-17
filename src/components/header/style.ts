import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    background-color: #FFE1AA;

    display: flex;
    justify-content: space-around;
    align-items: center;

    position: fixed;
    top: 0;
    right: 0;
`;

export const Logo = styled.img`
    height: 100px;
    width: 100px;
`;

export const NavBar = styled.header`
    height: 100px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NavLink = styled.a`
    height: 100px;
    width: 120px;
    text-decoration: none;

    cursor: pointer;
    transition: all 0.5s;
    background-color: #FFE1AA;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        opacity: 0.5;
    }
`;

export const NavText = styled.p`
    font-size: 100%;
    font-weight: bold;
    text-align: center;
    color: #7F2121;
`;