import {styled} from "../core/styledComponents";

export const CharactersListContainer = styled<{}, "main">("main")`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    padding: 10px;
    padding-top: 65px;
    @media (max-width: 520px) {
        padding-top: 100px;
    }
    @media (max-width: 376px) {
        padding-top: 125px;
    }
`;
