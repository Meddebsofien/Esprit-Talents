import styled from "styled-components";

export default function Icon({ color, children }) {
  return <StyledIcon background={color}>{children}</StyledIcon>;
}

const StyledIcon = styled.div`
  height: 3.5rem;
  width: 3.5rem;
 background: ${props => props.color}; 
  display: flex;
  
  justify-content: center;
  align-items: center;
  border-radius: 5rem;
  color:   #03217b;
  cursor: pointer;
  border: 1px solid   #03217b;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;