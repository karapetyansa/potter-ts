import {styled} from "../core/styledComponents";

export const PageContainer = styled<{}, "div">("div")`
    display: flex;
    flex-direction: column;
    width: 35%;
    margin: 0px auto 0px auto;
    @media (max-width: 1200px) {
        width: 70%;
    }
    @media (max-width: 800px) {
        width: 90%;
    }
    padding: 20px 0px 20px 0px;
`;
