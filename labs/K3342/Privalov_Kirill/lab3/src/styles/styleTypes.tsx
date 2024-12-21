import styled from "styled-components";

export const Card = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  box-shadow: ${(props) => props.theme.shadows.card};
  padding: 20px;
  transition: transform ${(props) => props.theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
  }
`;

export const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border: none;
  padding: 10px 20px;
  border-radius: ${(props) => props.theme.borderRadius.small};
  cursor: pointer;
  transition: background ${(props) => props.theme.transitions.default};

  &:hover {
    background: darken(${(props) => props.theme.colors.primary}, 10%);
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const ImageCard = styled.div`
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const ClinicCard = styled.div`
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ClinicImage = styled.img`
  height: 150px;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const MainImage = styled.img`
  height: 250px;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const ClinicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin: 0 auto;
  max-width: 1200px;
`;

export const ClinicButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  justify-content: center;
`;

export const ServiceCard = styled.div`
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem auto;
`;
