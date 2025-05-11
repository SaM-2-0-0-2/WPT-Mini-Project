import { Welcomevideo } from "./components/Welcomevideo";
import { Intropara } from "./components/Intropara";
import { Container } from 'react-bootstrap';
import { CardSlider } from "./components/Cardslider";

function Home() {
    return (
        <>
            <Welcomevideo />
            <Container fluid className="my-2 px-3 intro">
                <Intropara />
            </Container>
            <CardSlider/>
        </>
    );
}

export default Home;