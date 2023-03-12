import styled from "styled-components";

export const ClickableHeader = styled.h3`
  color: ${({theme}) => theme.doxastic.pallette.outOfFocus};
  ${({theme}) => theme.doxastic.fonts.light}
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${({theme}) => theme.doxastic.pallette.outOfFocusHover};
  }

  &:active {
    color: ${({theme}) => theme.doxastic.pallette.fg};
  }
`;